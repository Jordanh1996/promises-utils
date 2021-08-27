interface PromiseFulfilledResult<T> {
  status: "fulfilled";
  value: T;
}

interface PromiseRejectedResult {
  status: "rejected";
  reason: any;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

type Returnable = (...args: any) => any;
type PromiseResult<T> = ReturnType<T extends Returnable ? T : Returnable> extends PromiseLike<infer U> ? U : T;

export interface ThrottlePromisesOptions {
  /**
   * The maximum number of running concurrent promises.
   * Default: Infinity
   */
  limit?: number;

  /**
   * Whether a rejected Promise should throw an error and stop the execution of all the Promises.
   * NOTE: when allSettled is set to true the return values is at the format of @see {PromiseSettledResult}
   * Default: false
   */
  allSettled?: boolean;
}

/**
 * Accepts an array of functions that returns promises, and options, runs the Promises until all are settled with a limitation on the concurrency.
 * @param {Array<() => Promise>} promiseFunctions - An array of functions that returns a Promise
 * @param {ThrottlePromisesOptions} options
 * @returns {Array<PromiseSettledResult>} - Returns an array with the same order of the input, each value includes the Promise resolved / rejected value
 */
export function throttlePromises<
  T extends readonly (() => Promise<unknown>)[] | readonly [() => Promise<unknown>],
  K extends ThrottlePromisesOptions
>(promiseFunctions: T, options?: K):
  Promise<{ -readonly [P in keyof T]: 
    K['allSettled'] extends true
      ? PromiseSettledResult<PromiseResult<T[P]>>
      : PromiseResult<T[P]>
  }>;

/**
 * Accepts an iterable, each member should be a function that returns a Promise, also accepts options.
 * Runs the Promises concurrently with the limit specified in the options and returns the results when all are settled.
 * @param {Iterable} iterable {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols}
 * @returns {Array<PromiseSettledResult>} - Returns an array with the same order of the input iterable, each value includes the Promise resolved / rejected value
 */
export function throttlePromises<
  T extends () => Promise<unknown>,
  K extends ThrottlePromisesOptions
>(
  iterable: Iterable<T>,
  options?: K
):
  Promise<
    K['allSettled'] extends true
      ? PromiseSettledResult<PromiseResult<T>>[]
      : PromiseResult<T>[]
  >;

export function throttlePromises(
  promiseFunctions: Iterable<() => Promise<unknown>>,
  { limit = Infinity, allSettled = false }: ThrottlePromisesOptions = {}
) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(promiseFunctions);
    const results: (typeof allSettled extends true ? PromiseSettledResult<unknown> : unknown)[] = [];
    let IterableIndex = 0;
    let unSettledPromisesCount = promises.length;
    let breakRejected = false; // used if allSettled is false and a Promise rejected

    const iteration = async () => {
      if (promises.length) {
        const index = IterableIndex++;

        try {
          const promiseGenerator = promises.shift();
          
          if (typeof promiseGenerator !== 'function') {
            throw new Error('Invalid argument: iterable member was not a function');
          }

          results[index] = allSettled ?
            { status: 'fulfilled', value: await promiseGenerator() }
            : await promiseGenerator();
        } catch (err) {
          if (allSettled) {
            results[index] = { status: 'rejected', reason: err };
          } else {
            breakRejected = true; // escapes another loop in the finally statement
            reject(err);
          }
        } finally {
          if (breakRejected) {
            return;
          }
          unSettledPromisesCount--;
          if (unSettledPromisesCount <= 0) {
            resolve(results);
          } else {
            iteration();
          }
        }
      }
    };

    for (let i = 0; i < limit; i++) {
      iteration();
    }
  });
}

/**
 * Runs all of the promises returned by the object values functions, the concur
 * @param {Record<string, () => Promise<unknown>>} promiseFunctionsObject an object with each key as a function that generates a promise
 * @param {ThrottlePromisesOptions} options
 * @returns {Record<string, PromiseSettledResult>} - An object with keys that originates from the promiseFunctionsObject parameter.
 * The values include the resolved / rejected value from the promise
 */
export function throttlePromisesObject<
  T extends Record<string, () => Promise<unknown>>,
  K extends ThrottlePromisesOptions
>(
  promiseFunctionsObject: T, 
  options?: K
):
  Promise<{
    -readonly [P in keyof T]:
      K['allSettled'] extends true
        ? PromiseSettledResult<PromiseResult<T[P]>> 
        : PromiseResult<T[P]>
  }>;

export async function throttlePromisesObject(
  promiseFunctionsObject: Record<string, () => Promise<unknown>>,
  options: ThrottlePromisesOptions = {}
) {
  const promiseFunctionsObjectDuplicate = { ...promiseFunctionsObject } // Used to prevent weird side effects if mutations are made on the original object while running the asyncronous functions
  const keys = Object.keys(promiseFunctionsObjectDuplicate);
  const promiseFunctions = Object.values(promiseFunctionsObjectDuplicate);
  const result: any = {};

  const resultArr = await throttlePromises(promiseFunctions, options);

  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = resultArr[i];
  }

  return result;
}

const a = async () => {
  const b = await throttlePromises(
    [
      async () => 1,
      async () => true,
    ],
  );

  const c = await throttlePromisesObject({
    a: async () => 1,
    b: async () => true,
  })
}
