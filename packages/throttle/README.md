## installation

```bash
npm install @promise/throttle
```

# @promise/throttle
A utility module to run a set of Promises with a limit on the number of concurrent promises.

## usage

### Array version:
```typescript
import { promiseThrottle } from '@promise/throttle';

async function example() {
  const [
    first,  // { status: 'fulfilled', value: 1 }
    second,// { status: 'rejected', reason: (The error object) }
    third, // { status: 'fulfilled', value: 2 }
  ] = await promiseThrottle(
    [
      async () => {
        await sleep(100);

        return 1;
      },
      async () => { throw new Error(); },
      async () => 2,
    ], {
      limit: 2,         // Will run at most 2 Promises at a time
      allSettled: true  // A rejected Promise does not cancels execution and throws an error
    }
  )
}

// When allSettled option is off.
// Note: If one of the Promise rejects then the promiseThrottle call will throw, and the rest of the Promises that hasn't started will be canceled.
async function example() {
  const [
    first,  // 1
    second,// 2
  ] = await promiseThrottle(
    [
      async () => {
        await sleep(100);

        return 1;
      },
      async () => 2,
    ], {
      limit: 1,         // Will run at most 1 Promise
      allSettled: false
    }
  )
}

```

### Object version:
```typescript
import { promiseThrottleObject } from '@promise/throttle';

async function example() {
  const input = {
    first: async () => {
        await sleep(100);

        return 1;
      },
    second: async () => { throw new Error(); },
    third: async () => 2,
  };

  const {
    first,  // { status: 'fulfilled', value: 1 }
    second,// { status: 'rejected', reason: (The error object) }
    third, // { status: 'fulfilled', value: 2 }
  } = await promiseThrottleObject(
    input, {
      limit: 2 // Will run at most 2 Promises at a time
      allSettled: true  // A rejected Promise does not cancels execution and throws an error
    }
  )
}

```

### Iterable version:
```typescript
import { promiseThrottle } from '@promise/throttle';

async function example() {
  const input = new Set([
    async () => {
      await sleep(100);

      return 1;
    },
    async () => { throw new Error(); },
    async () => 2,
  ]);

  const [
    first,  // { status: 'fulfilled', value: 1 }
    second,// { status: 'rejected', reason: (The error object) }
    third, // { status: 'fulfilled', value: 2 }
  ] = await promiseThrottle(
    input, 
    {
      limit: 2 // Will run at most 2 Promises at a time
      allSettled: true  // A rejected Promise does not cancels execution and throws an error
    }
  )
}
