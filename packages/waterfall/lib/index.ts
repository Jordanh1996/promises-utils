

interface PromisesWaterfallOptions {
  /**
   * When a Promise rejects then the waterfall keep running.
   * The Promise function will be called with a notion of {PromiseSettledResult}
   */
  allSettled?: boolean;
}

export type Task<ValueType, ReturnType> = (
	previousValue: ValueType
) => ReturnType | PromiseLike<ReturnType>;

export type InitialTask<ReturnType> = () => ReturnType | PromiseLike<ReturnType>;

export function promisesWaterfall<ValueType1, ReturnType>(
	promiseFunctions: readonly [
		Task<ValueType1, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
export function promisesWaterfall<ValueType1, ValueType2, ReturnType>(
	promiseFunctions: readonly [
		Task<ValueType1, ValueType2>,
		Task<ValueType2, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
export function promisesWaterfall<ValueType1, ValueType2, ValueType3, ReturnType>(
	promiseFunctions: readonly [
		Task<ValueType1, ValueType2>,
		Task<ValueType2, ValueType3>,
		Task<ValueType3, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
export function promisesWaterfall<ValueType1, ValueType2, ValueType3, ValueType4, ReturnType>(
	promiseFunctions: readonly [
		Task<ValueType1, ValueType2>,
		Task<ValueType2, ValueType3>,
		Task<ValueType3, ValueType4>,
		Task<ValueType4, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
export function promisesWaterfall<ValueType1, ValueType2, ValueType3, ValueType4, ValueType5, ReturnType>(
	promiseFunctions: readonly [
		Task<ValueType1, ValueType2>,
		Task<ValueType2, ValueType3>,
		Task<ValueType3, ValueType4>,
		Task<ValueType4, ValueType5>,
		Task<ValueType5, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
export function promisesWaterfall<
	ValueType1,
	ValueType2,
	ValueType3,
	ValueType4,
	ValueType5,
	ValueType6,
	ReturnType
>(
	promiseFunctions: readonly [
		Task<ValueType1, ValueType2>,
		Task<ValueType2, ValueType3>,
		Task<ValueType3, ValueType4>,
		Task<ValueType4, ValueType5>,
		Task<ValueType5, ValueType6>,
		Task<ValueType6, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
export function promisesWaterfall<
	ValueType1,
	ValueType2,
	ValueType3,
	ValueType4,
	ValueType5,
	ValueType6,
	ValueType7,
	ReturnType
>(
	promiseFunctions: readonly [
		Task<ValueType1, ValueType2>,
		Task<ValueType2, ValueType3>,
		Task<ValueType3, ValueType4>,
		Task<ValueType4, ValueType5>,
		Task<ValueType5, ValueType6>,
		Task<ValueType6, ValueType7>,
		Task<ValueType7, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
export function promisesWaterfall<
	ValueType1,
	ValueType2,
	ValueType3,
	ValueType4,
	ValueType5,
	ValueType6,
	ValueType7,
	ValueType8,
	ReturnType
>(
	promiseFunctions: readonly [
		Task<ValueType1, ValueType2>,
		Task<ValueType2, ValueType3>,
		Task<ValueType3, ValueType4>,
		Task<ValueType4, ValueType5>,
		Task<ValueType5, ValueType6>,
		Task<ValueType6, ValueType7>,
		Task<ValueType7, ValueType8>,
		Task<ValueType8, ReturnType>
	],
	options?: PromisesWaterfallOptions
): Promise<ReturnType>;
/**
 * Run Promises in series, each passing its result to the next.
 * @param {Iterable<(formerResolvedValue) => Promise>} promiseFunctions - Functions that returns values, if a Promise is returned, it is awaited and it's resolved value will be passed to the next one
 * @param {PromisesWaterfallOptions} options
 * @returns A Promise that is resolved when all the input Promises are resolved. 
 * Rejected if any of the Promise rejects (when allSetteld is set to false)
 */
export async function promisesWaterfall(
	promiseFunctions: Iterable<Task<unknown, unknown>>,
  { allSettled = false }: PromisesWaterfallOptions = {}
) {
  const promiseFnArr = Array.from(promiseFunctions);

  let formerResult = undefined;
  for (const promiseFn of promiseFnArr) {
    try {
      formerResult = await promiseFn(formerResult);
    } catch (err) {
      if (allSettled) {
        formerResult = undefined;
        continue;
      }

      throw err;
    }
  }

  return formerResult;
}
