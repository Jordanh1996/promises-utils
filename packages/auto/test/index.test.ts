import { promiseAuto, TaskError } from '../lib';

describe('promiseAuto', () => {
  it('should call the tasks in the right order', async () => {
    const callOrder: string[] = [];

    await promiseAuto({
      task1: {
        dependencies: ['task2'],
        task: () => new Promise(resolve => {
          setTimeout(() => {
            callOrder.push('task1');
            resolve(null);
          }, 0);
        }),
      },
      task2: () => callOrder.push('task2'),
      task3: {
        dependencies: ['task2'],
        task: () => callOrder.push('task3'),
      },
      task4: {
        dependencies: ['task1', 'task2'],
        task: () => callOrder.push('task4'),
      },
      task5: {
        dependencies: ['task1', 'task4'],
        task: () => callOrder.push('task5'),
      },
    });

    expect(callOrder).toEqual(['task2', 'task3', 'task1', 'task4', 'task5']);
  });

  it('should limit the concurrency', async () => {
    const concurrency = 1;
    let runningTasks = 0;
    let failed = false;

    const testConcurrency = () => new Promise(resolve => {
      runningTasks++;
      if (runningTasks > concurrency) {
        failed = true;
      }
      setTimeout(() => {
        runningTasks--;
        resolve(null);
      }, 0);
    });

    await promiseAuto({
      task1: testConcurrency,
      task2: testConcurrency,
    }, { concurrency });

    if (failed) {
      throw new Error('Tests concurrency was not limited');
    }
  });

  it('should call the functions and return the correct results', async () => {
    const result = await promiseAuto({
      task1: () => 'task1',
      task2: {
        dependencies: ['task1'],
        task: ({ task1 }) => {
          return new Promise(resolve => {
            expect(task1).toBe('task1');
            resolve('task2');
          });
        },
      },
      task3: {
        dependencies: ['task1', 'task2'],
        task: ({ task1, task2 }) => {
          expect(task1).toBe('task1');
          expect(task2).toBe('task2');
          
          return 'task3';
        },
      },
    });

    expect(result).toEqual({
      task1: 'task1',
      task2: 'task2',
      task3: 'task3',
    });
  });

  it('should resolve with empty object', async () => {
    const result = await promiseAuto({});

    expect(result).toEqual({});
  });

  it('should reject and stop exection if an error was thrown', async () => {
    let task3Ran = false;

    try {
      await promiseAuto({
        task1: () => 'task1',
        task2: {
          dependencies: ['task1'],
          task: async () => { throw new Error('bla') },
        },
        task3: {
          dependencies: ['task2'],
          task: () => { task3Ran = true },
        },
      });

      fail('should have thrown');
    } catch (err) {
      const testTask3Ran = () => new Promise((resolve, reject) => {
        setTimeout(() => {
          expect(task3Ran).toBe(false);
          resolve(null);
        }, 0);
      });
      
      await testTask3Ran();
      expect((<TaskError>err).taskName).toBe('task2');
      expect((<TaskError>err).results).toEqual({ task1: 'task1' });
    }
  });

  it('should cancel the flow and resolve with the results', async () => {
    let task3Ran = false;

    const result = await promiseAuto({
      task1: () => 'task1',
      task2: {
        dependencies: ['task1'],
        task: (results, cancel) => {
          cancel();
        },
      },
      task3: {
        dependencies: ['task2'],
        task: () => {
          task3Ran = true;
          return 'task3';
        },
      },
    });

    const testTask3Ran = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        expect(task3Ran).toBe(false);
        resolve(null);
      }, 0);
    });
    
    await testTask3Ran();
    expect(result).toEqual({ task1: 'task1' });
  });

  it('should cancel the flow and resolve with the results including the cancel param', async () => {
    let task3Ran = false;

    const result = await promiseAuto({
      task1: () => 'task1',
      task2: {
        dependencies: ['task1'],
        task: (results, cancel) => {
          cancel('task2');
        },
      },
      task3: {
        dependencies: ['task2'],
        task: () => {
          task3Ran = true;
          return 'task3';
        },
      },
    });

    const testTask3Ran = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        expect(task3Ran).toBe(false);
        resolve(null);
      }, 0);
    });
    
    await testTask3Ran();
    expect(result).toEqual({ task1: 'task1', task2: 'task2' });
  });

  it('should throw an error for tasks which all have dependencies', async () => {
    try {
      await promiseAuto({
        task1: {
          dependencies: ['task2'],
          task: () => 'task1',
        },
        task2: {
          dependencies: ['task1'],
          task: () => 'task2',
        },
      })

      fail('should have thrown an error');
    } catch (err) {
      // pass
    }
  });

  it('should throw an error for tasks with cyclic dependency graph', async () => {
    try {
      await promiseAuto({
        task1: () => 'task1',
        task2: {
          dependencies: ['task3'],
          task: () => 'task2',
        },
        task3: {
          dependencies: ['task2'],
          task: () => 'task3',
        },
      })

      fail('should have thrown an error');
    } catch (err) {
      // pass
    }
  });
});