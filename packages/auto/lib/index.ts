type ValueType<T> = T extends Promise<infer U> ? U : T;
type Returnable = (...args: any) => any;
type PromiseResult<T extends Returnable> = ValueType<ReturnType<T>>;

type TaskFn = (results: any, cancel: (value?: any) => void) => (Promise<unknown> | unknown);
type TaskWithoutDependencies = TaskFn;
type TaskWithDependencies<T> = { task: TaskFn, dependencies: Array<keyof T> };
type Task<T> = TaskWithDependencies<T> | TaskWithoutDependencies;
type TaskResult<T> = T extends { task: Returnable } ? PromiseResult<T['task']> : (T extends Returnable ? PromiseResult<T> : unknown);


export interface PromiseAutoOptions {
  /**
   * The number of concurrent tasks that are able to run in a given point of time
   * @default Infinity (No concurrency is implemented)
   */
  concurrency?: number;
}

class TaskError extends Error {
  taskName: string;
  results: any;

  constructor(message: string, taskName: string, results: any) {
    super(message);
    this.taskName = taskName;
    this.results = results;
  }
}

/**
 * Accepts an object with values that represents tasks which is a function that returns a value or Promise, some of which may include dependencies.
 * Each of the task will run only after all of the dependencies has resolved.
 * Each of the tasks with dependencies will be called with the results object which should hold the return value of its dependencies
 * Returns all of the tasks results
 * @param tasks An object, that each key represents a task, a task is a function that returns a Promise or a value.
 * The value of each key can be either the task / function, or an object as specified in {TaskWithDependencies}
 * @param {PromiseAutoOptions} options
 * @returns An object that each key would be the task name, and the value will be the return value for the given key task
 */
export function promiseAuto<T extends { [K in keyof T]: Task<T> }>(tasks: T, options?: PromiseAutoOptions): Promise<{ [K in keyof T]: TaskResult<T[K]> }>;

export function promiseAuto<T extends { [K in keyof T]: Task<T> }>(
  tasks: T,
  { concurrency = 0 }: PromiseAutoOptions = {}
) {
  return new Promise((resolve, reject) => {
    let unfinishedPromisesCount = Object.keys(tasks).length;
    const results: Partial<{ [K in keyof T]: TaskResult<T[K]> }> = {};
    if (!unfinishedPromisesCount) {
      return resolve(results);
    }

    try {
      checkForGraphCyclesOrUnreachableTasks(tasks);
    } catch(err) {
      return reject(err);
    }
  
    const tasksWithoutDependencies: Partial<Record<keyof T, TaskFn>> = {};
    const tasksWithDependences: Partial<Record<keyof T, Set<keyof T>>> = {};
    let canceled = false;
    let runningPromisesCount = 0;
    const pendingTasks: ([keyof T, TaskFn])[] = [];

    const notifies = Object.fromEntries(Object.keys(tasks).map((taskName) => [taskName, new Set<keyof T>()])) as Record<keyof T, Set<keyof T>>;

    for (const taskName in tasks) {
      const task = tasks[taskName];

      if (typeof task !== 'function') {
        if (task.dependencies.length) {
          tasksWithDependences[taskName] = new Set(task.dependencies);
          for (const dependency of task.dependencies) {
            notifies[dependency].add(taskName);
          }
        } else {
          tasksWithoutDependencies[taskName] = task.task;
        }
      } else {
        tasksWithoutDependencies[taskName] = task as TaskFn;
      }
    }

    const runTask = async (taskName: keyof T, task: TaskFn) => {
      try {
        runningPromisesCount++;
        const result = (await task(results, (value?: any) => cancel(taskName, value))) as TaskResult<T[keyof T]>;
        results[taskName] = result;
        runningPromisesCount--;
        unfinishedPromisesCount--;

        if (!unfinishedPromisesCount) {
          return resolve(results);
        }

        if (pendingTasks.length) {
          const [pendingTaskName, pendingTask] = pendingTasks[0];
          pendingTasks.shift();

          runTask(pendingTaskName, pendingTask);
        }

        spawnNewTasks(taskName);
      } catch (err) {
        canceled = true;
        reject(new TaskError(err instanceof Error ? err.message : 'Task has thrown an error', taskName as string, results));
      }
    };

    const spawnNewTasks = (finishedTaskName: keyof T) => {
      if (canceled) {
        return;
      }

      notifies[finishedTaskName].forEach((taskName) => {
        tasksWithDependences[taskName]?.delete(finishedTaskName);

        if (!(tasksWithDependences[taskName]?.size)) {
          const task = (tasks[taskName] as TaskWithDependencies<T>).task;

          pushTask(taskName, task);
        }
      });
    };

    const pushTask = (taskName: keyof T, task: TaskFn) => {
      if (canceled) {
        return;
      }
      if (concurrency && runningPromisesCount === concurrency) {
        pendingTasks.push([taskName, task]);
      } else {
        runTask(taskName, task);
      }
    };

    const cancel = (taskName: keyof T, value?: any) => {
      if (value !== undefined) {
        results[taskName] = value;
      }
      canceled = true;
      resolve(results);
      throw new Error();
    };

    for (const [taskName, task] of Object.entries(tasksWithoutDependencies)) {
      pushTask(taskName as keyof T, task as TaskFn);
    }
  });
}

class DependencyGraphError extends Error {}

// Khan Algorithm - http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
function checkForGraphCyclesOrUnreachableTasks<T extends { [K in keyof T]: Task<T> }>(
  tasks: T,
) {
  const queue: (keyof T)[] = [];
  const nodes = {} as Record<keyof T, Set<keyof T>>;
  const pointingTo = {} as Record<keyof T, Set<keyof T>>;
  let counter = 0;

  for (const [taskName, task] of Object.entries<Task<T>>(tasks)) {
    if (typeof task === 'function') {
      nodes[taskName as keyof T] = new Set();
      queue.push(taskName as keyof T);
    } else {
      nodes[taskName as keyof T] = new Set(task.dependencies);
      if (!task.dependencies.length) {
        queue.push(taskName as keyof T);
      }
      for (const dependency of task.dependencies) {
        if (pointingTo[dependency]) {
          pointingTo[dependency].add(taskName as keyof T);
        } else {
          pointingTo[dependency] = new Set([taskName as keyof T]);
        }
      }
    }
  }

  if (!queue.length) {
    throw new DependencyGraphError('Tasks without dependencies not found');
  }

  while (queue.length) {
    const father = queue.shift() as keyof T;
    const children = (pointingTo[father] || new Set());
    counter++;
    children.forEach(child => {
      nodes[child].delete(father);
      if (!nodes[child].size) {
        queue.push(child);
      }
    });
  }

  if (counter !== Object.keys(tasks).length) {
    throw new DependencyGraphError('Invalid dependency graph');
  }
}
