import { promiseThrottleObject } from '../lib';
import { wait } from './utils';

describe('promiseThrottleObject', () => {
  it('should run at most promises as the concurrency', async () => {
    const callOrder: number[] = [];
    const limit = 2;
    let runningPromises = 0;
    let maximumRunningPromises = 0;
    const updateMaximumRunningPromises = () => {
      maximumRunningPromises = Math.max(maximumRunningPromises, runningPromises);
    }

    const result = await promiseThrottleObject({
      1: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(1);
        setTimeout(() => {
          runningPromises--;
          resolve(1);
        }, 0);
      }),
      2: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(2);
        }, 0);
      }),
      3: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(3);
        }, 0);
      }),
    }, { limit });

    expect(result).toEqual({ 1: 1, 2: 2, 3: 3 });
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

    const result = await promiseThrottleObject({
      1: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(1);
        setTimeout(() => {
          runningPromises--;
          resolve(1);
        }, 0);
      }),
      2: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(2);
        }, 0);
      }),
      3: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(3);
        }, 0);
      }),
    });

    expect(result).toEqual({ 1: 1, 2: 2, 3: 3 });
    expect(runningPromises).toBe(0);
    expect(maximumRunningPromises).toBe(3);
  });

  it('should throw if one of the throttled promises throw and stop running the promises', async () => {
    const limit = 1;
    const errorMessage = 'ERROR_MESSAGE';
    let secondFunctionRan = false;

    try {
      await promiseThrottleObject({
        1: async () => Promise.reject(new Error(errorMessage)),
        2: async () => {
          secondFunctionRan = true;
        },
      }, { limit });

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

    const result = await promiseThrottleObject({
      1: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(1);
        setTimeout(() => {
          runningPromises--;
          resolve(1);
        }, 0);
      }),
      2: () => new Promise((resolve, reject) => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          reject(2);
        }, 0);
      }),
      3: () => new Promise(resolve => {
        runningPromises++;
        updateMaximumRunningPromises();
        callOrder.push(2);
        setTimeout(() => {
          runningPromises--;
          resolve(3);
        }, 0);
      }),
    }, { limit, allSettled: true });

    expect(result).toEqual({
      1: { status: 'fulfilled', value: 1 },
      2: { status: 'rejected', reason: 2 },
      3: { status: 'fulfilled', value: 3 },
    });
    expect(runningPromises).toBe(0);
    expect(maximumRunningPromises).toBe(limit);
  });

  it('should immediately resolve when input is empty object', async () => {
    const result = await promiseThrottleObject({});

    expect(result).toEqual({});
  });
});