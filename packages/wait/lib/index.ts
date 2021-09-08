export type TimeUnit = 'ms' /** milliseconds */
  | 's' /** seconds */
  | 'm' /** minutes */
  | 'h' /** hours */
  | 'd' /** days */

export interface WaitOptions {
  /**
   * e.g seconds minutes etc
   * @default 'ms' (milliseconds)
   */
  timeUnit?: TimeUnit;
  /**
   * Whether to reject after the given time instead of resolving
   * @default false
   */
  reject?: boolean;
}

/**
 * Instead of passing a String literal to the timeUnit of the wait function options you can use this constant
 */
export const UNITS = {
  MS: 'ms',
  S: 's',
  M: 'm',
  H: 'h',
  D: 'd',
}

/**
 * Accepts a given time from the point of being called and resolves after that time
 * @param {number} time The amount of time to wait before finishing
 * @param {WaitOptions} waitOptions
 * @returns A Promise that resolves after the given time
 */
export function wait(
  time: number,
  { timeUnit = UNITS.MS as TimeUnit, reject = false }: WaitOptions = {}
): Promise<void> {
  switch(timeUnit) {
    case UNITS.D:
      time *= 24;
    case UNITS.H:
      time *= 60;
    case UNITS.M:
      time *= 60;
    case UNITS.S:
      time *= 1000;
    default:
      // pass
  }

  return new Promise((res, rej) => {
    setTimeout(reject ? rej : res, time);
  });
}