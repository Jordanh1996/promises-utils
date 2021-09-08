import { UNITS, wait } from '../lib';

describe('wait', () => {
  describe('with fake timers', () => {

    beforeEach(() => {
      jest.useFakeTimers('legacy');
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    const tests: Array<[Parameters<typeof wait>, number]> = [
      [[2], 2],
      [[2, { timeUnit: UNITS.MS }], 2],
      [[2, { timeUnit: UNITS.S }], 2 * 1000],
      [[2, { timeUnit: UNITS.M }], 2 * 1000 * 60],
      [[2, { timeUnit: UNITS.H }], 2 * 1000 * 60 * 60],
      [[2, { timeUnit: UNITS.D }], 2 * 1000 * 60 * 60 * 24],
    ];

    for (const [args, setTimeoutTime] of tests) {
      it(`should pass ${setTimeoutTime} to setTimeout with args: ${JSON.stringify(args)}`, () => {
        wait(...args);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), setTimeoutTime);
      });
    }
  });

  describe('with real timers', () => {
    it('should resolve after the given time', async () => {
      await wait(0, { reject: false });
    });

    it('should reject if reject option is set to true', async () => {
      try {
        await wait(0, { reject: true });
  
        fail('should had thrown');
      } catch (err) {
        expect(err).not.toBeInstanceOf(Error);
      }
    });
  });
});