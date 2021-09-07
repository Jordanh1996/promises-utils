import { promiseThrottle } from '../lib';
import { wait } from './utils';

describe('promiseThrottle', () => {
  it('should run at most promises as the concurrency', async () => {
    const callOrder: number[] = [];
    const limit = 2;
    let runningPromises = 0;
    let maximumRunningPromises = 0;
    const updateMaximumRunningPromises = () => {
      maximumRunningPromises = Math.max(maximumRunningPromises, runningPromises);
    }

    const result = await promiseThrottle([
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(1);
        setTimeout(() => {
          runningPromises--;
          resolve(1);
        }, 0);
      }),
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(2);
        }, 0);
      }),
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(3);
        }, 0);
      }),
    ], { limit });

    expect(result).toEqual([1, 2, 3]);
    expect(runningPromises).toBe(0);
    expect(maximumRunningPromises).toBe(limit);
  });

  it('should run all of the promises concurrently and not limit if the limit is not specified', async () => {
    const callOrder: number[] = [];
    let runningPromises = 0;
    let maximumRunningPromises = 0;
    const updateMaximumRunningPromises = () => {
      maximumRunningPromises = Math.max(maximumRunningPromises, runningPromises);
    }

    const result = await promiseThrottle([
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(1);
        setTimeout(() => {
          runningPromises--;
          resolve(1);
        }, 0);
      }),
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(2);
        }, 0);
      }),
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(3);
        }, 0);
      }),
    ]);

    expect(result).toEqual([1, 2, 3]);
    expect(runningPromises).toBe(0);
    expect(maximumRunningPromises).toBe(3);
  });

  it('should throw if one of the throttled promises throw and stop running the promises', async () => {
    const limit = 1;
    const errorMessage = 'ERROR_MESSAGE';
    let secondFunctionRan = false;

    try {
      await promiseThrottle([
        async () => Promise.reject(new Error(errorMessage)),
        async () => {
          secondFunctionRan = true;
        },
      ], { limit });

      fail('should have thrown');
    } catch (err) {
      expect((<Error>err).message).toBe(errorMessage);
      await wait(0); // give a chance to the second task to try to run
      expect(secondFunctionRan).toBe(false);
    }
  });

  it('should not throw and keep running when allSettled is set to true', async () => {
    const callOrder: number[] = [];
    const limit = 2;
    let runningPromises = 0;
    let maximumRunningPromises = 0;
    const updateMaximumRunningPromises = () => {
      maximumRunningPromises = Math.max(maximumRunningPromises, runningPromises);
    }

    const result = await promiseThrottle([
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(1);
        setTimeout(() => {
          runningPromises--;
          resolve(1);
        }, 0);
      }),
      () => new Promise((resolve, reject) => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          reject(2);
        }, 0);
      }),
      () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(3);
        }, 0);
      }),
    ], { limit, allSettled: true });

    expect(result).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 2 },
      { status: 'fulfilled', value: 3 },
    ]);
    expect(runningPromises).toBe(0);
    expect(maximumRunningPromises).toBe(limit);
  });

  it('should immediately resolve when input is empty array', async () => {
    const result = await promiseThrottle([]);

    expect(result).toEqual([]);
  });

  it('should limit concurrency when input is an iterable', async () => {
    const callOrder: number[] = [];
    const limit = 2;
    let runningPromises = 0;
    let maximumRunningPromises = 0;
    const updateMaximumRunningPromises = () => {
      maximumRunningPromises = Math.max(maximumRunningPromises, runningPromises);
    }
    const iterable = {
      [Symbol.iterator]: function* () {
        yield () => new Promise(resolve => {
          runningPromises++;
          updateMaximumRunningPromises();
          callOrder.push(1);
          setTimeout(() => {
            runningPromises--;
            resolve(1);
          }, 0);
        });
        yield () => new Promise(resolve => {
          runningPromises++;
          updateMaximumRunningPromises();
          callOrder.push(2);
          setTimeout(() => {
            runningPromises--;
            resolve(2);
          }, 0);
        });
        yield () => new Promise(resolve => {
          runningPromises++;
          updateMaximumRunningPromises();
          callOrder.push(2);
          setTimeout(() => {
            runningPromises--;
            resolve(3);
          }, 0);
        });
      }
    }

    const result = await promiseThrottle(iterable, { limit: 2 });

    expect(result).toEqual([1, 2, 3]);
    expect(runningPromises).toBe(0);
    expect(maximumRunningPromises).toBe(limit);
  });
});
