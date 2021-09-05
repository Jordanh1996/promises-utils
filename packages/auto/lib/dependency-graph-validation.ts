import { Task } from './index';

class DependencyGraphError extends Error {}

// Khan Algorithm - http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
export function checkForGraphCyclesOrUnreachableTasks<T extends { [K in keyof T]: Task<T> }>(
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