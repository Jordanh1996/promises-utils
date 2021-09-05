import { promiseWaterfall } from '../lib';

describe('waterfall', () => {
  it('should call the tasks in the right order', async () => {
    const callOrder: number[] = [];

    const result = await promiseWaterfall([
      () => {
        callOrder.push(1);
        return 1;
      },
      (one) => {
        callOrder.push(2);
        expect(one).toEqual(1);
        return 2;
      },
      (two) => {
        callOrder.push(3);
        expect(two).toEqual(2);
        return 3;
      },
    ]);

    expect(callOrder).toEqual([1, 2, 3]);
    expect(result).toEqual(3);
  });

  it('should stop execution and reject if one of the promises rejects', async () => {
    const callOrder: number[] = [];
    const errorMessage = 'ERROR_MESSAGE';

    try {
      await promiseWaterfall([
        () => {
          callOrder.push(1);
        },
        () => {
          throw new Error(errorMessage);
        },
        () => {
          callOrder.push(3);
        },
      ]);

      fail('should have thrown');
    } catch (err) {
      expect(callOrder).toEqual([1]);
      expect(err).toBeInstanceOf(Error);
      expect((<Error>err).message).toEqual(errorMessage);
    }
  });

  it('should not stop execution and keep running when allSettled is set to true', async () => {
    const callOrder: number[] = [];
    const errorMessage = 'ERROR_MESSAGE';

    const result = await promiseWaterfall([
      () => {
        callOrder.push(1);
        return 1;
      },
      (one) => {
        callOrder.push(2);
        expect(one).toEqual(1);
        throw new Error(errorMessage);
      },
      (two) => {
        callOrder.push(3);
        expect(two).toEqual(undefined);
        return 3;
      },
    ], { allSettled: true });

    expect(result).toEqual(3);
    expect(callOrder).toEqual([1, 2, 3]);
  });
});
