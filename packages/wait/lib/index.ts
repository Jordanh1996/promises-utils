export type TimeUnit = 'ms' /** milliseconds */
  | 's' /** seconds */
  | 'm' /** minutes */
  | 'h' /** hours */
  | 'd' /** days */

export interface WaitOptions {
  timeUnit?: TimeUnit; /** Default: Milliseconds */
}

const UNITS = {
  MS: 'ms',
  S: 's',
  M: 'm',
  H: 'h',
  D: 'd',
}

export function wait(
  time: number,
  { timeUnit = UNITS.MS as TimeUnit }: WaitOptions = {}
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

  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}