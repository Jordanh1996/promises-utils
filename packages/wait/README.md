## installation

```cmd
npm install @promise/wait
```

# @promise/wait
A utility module to fire a Promise that will be resolved after the time given in the parameter.

## usage

```typescript
import { wait } from '@promise/wait';

async function example() {
  await wait(1000);
  console.log('after 1 second');
}

/**
 * Can also use 's'(seconds), 'm'(minutes), 'h'(hours) 'd'(days)
 */
async function example2() {
  await wait(10, { timeUnit: 's' });
  console.log('after 10 seconds');
}

async function exampleRejects() {
  try {
    await wait(10, { reject: true });

    console.log('never reaches here');
  } catch (err) {
    console.log('logs this after 10 ms');
  }
}
```