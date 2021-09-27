import React from 'react';
import { CodeBlockExample } from '../../components/code';
import { KeyValue } from '../../components/key-value';
import { MiddleContainer } from '../../components/middle-container';
import { Signature } from '../../components/signature';
import { SubTitle, Text, Title } from '../../components/typography';
import { PageContainer } from '../page-container';

const promiseThrottleArgs = {
  'tasks (Iterable<Task>)': 'An array(or iterable) of functions that returns a Promise',
  'options.limit = Infinity (number)': 'The maximum amount of running tasks at any given point in time',
  'options.allSettled = false (boolean)': 'Whether to keep running even after a Promise rejects',
};

const promiseThrottleReturns = {
  'Promise': 'A Promise that resolves with an array of the results of given tasks',
};

const promiseThrottleObjectArgs = {
  'tasks (Record<string, Task>)': 'An object with values of functions that returns a Promise',
  'options.limit = Infinity (number)': 'The maximum amount of running tasks at any given point in time',
  'options.allSettled = false (boolean)': 'Whether to keep running even after a Promise rejects',
};

const promiseThrottleObjectReturns = {
  'Promise': 'A Promise that resolves with the same keys of the object input and the values are their corresponding task result',
};

export function Throttle() {
  return (
    <PageContainer>
      <MiddleContainer>
        <Title>promises-utils.throttle</Title>
        <Text>Each of these functions are available either from promises-utils or promises-utils.throttle</Text>

        <SubTitle>promiseThrottle</SubTitle>
        <Signature>
          {"promiseThrottle(Array<Task>, options?): Promise<Array of Tasks result>"}
        </Signature>
        <Text>Runs the given functions while limiting the concurrency</Text>
        <Text>Returns the results of the functions in an array at the same order</Text>
        <br />
        <Text><b>Arguments</b></Text>
        <KeyValue keyValues={promiseThrottleArgs} />
        <Text><b>Returns</b></Text>
        <KeyValue keyValues={promiseThrottleReturns} />
        <Text><b>Example</b></Text>
        <br />
        <CodeBlockExample
          text={
`import { promiseThrottle } from 'promises-utils.throttle';
// import { promiseThrottleObject } from 'promises-utils/throttle';

const [
  first,  // 1
  second,// 2
  third, // 3
] = await promiseThrottle(
  [
    async () => 3,
    async () => 2,
    async () => 2,
  ], {
    limit: 2,         // Will run at most 2 Promises at a time
  }
)

const [
  first,  // { status: 'fulfilled', value: 1 }
  second,// { status: 'rejected', reason: (The error object) }
  third, // { status: 'fulfilled', value: 2 }
] = await promiseThrottle(
  [
    async () => {
      await wait(100);

      return 1;
    },
    async () => { throw new Error(); },
    async () => 2,
  ], {
    limit: 2,         // Will run at most 2 Promises at a time
    allSettled: true  // A rejected Promise does not cancels execution and throws an error
  }
)`
          }
        />
        <br />

        <SubTitle>promiseThrottleObject</SubTitle>
        <Signature>
          {"promiseThrottleObject(Record<string, Task>, options?):"}
          <br />&nbsp;&nbsp;&nbsp;&nbsp;
          {"Promise<Record<string, Result<Task>>>"}
        </Signature>
        <Text>Runs the given functions while limiting the concurrency</Text>
        <Text>Returns the results of the functions in an object</Text>
        <br />
        <Text><b>Arguments</b></Text>
        <KeyValue keyValues={promiseThrottleObjectArgs} />
        <Text><b>Returns</b></Text>
        <KeyValue keyValues={promiseThrottleObjectReturns} />
        <Text><b>Example</b></Text>
        <br />
        <CodeBlockExample
          text={
`import { promiseThrottleObject } from 'promises-utils.throttle';
// import { promiseThrottleObject } from 'promises-utils/throttle';

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
)`
          }
        />
        <br />
      </MiddleContainer>
    </PageContainer>
  );
}
