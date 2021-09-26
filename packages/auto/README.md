## installation

```bash
npm install promises-utils.auto
```

# promises-utils.auto
Determines the best order for running the AsyncFunctions in tasks, based on their requirements. Each function can optionally depend on other functions being completed first, and each function is run as soon as its requirements are satisfied.

AsyncFunctions also receive an object containing the results of functions which have completed so far as an argument.

Insprired from [async.auto](https://caolan.github.io/async/v3/docs.html#auto)

## usage

### Array version:
```typescript
import { promiseAuto } from 'promises-utils.throttle';

async function example() {
  const results = promiseAuto({
    a: () => 'a';
    b: {
      dependencies: ['a', 'c'],
      task: ({ a }) => {
        console.log(a); // 'a', runs after "a" and "c" is resolved
        return 100;
      }
    },
    c: async () => {
      await wait(1000);
    }
  });
  console.log(results) // { a: 'a', b: 100, c: undefined }
}

```

