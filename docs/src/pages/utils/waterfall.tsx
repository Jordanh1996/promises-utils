import React from 'react';
import { CodeBlockExample } from '../../components/code';
import { KeyValue } from '../../components/key-value';
import { MiddleContainer } from '../../components/middle-container';
import { Signature } from '../../components/signature';
import { SubTitle, Text, Title } from '../../components/typography';
import { PageContainer } from '../page-container';

const args = {
  'tasks (Iterable<Task>)': 'An array(or iterable) of functions that returns a Promise',
  'options.allSettled = false (boolean)': 'Whether to keep running even after a Promise rejects',
};

const returns = {
  'Promise': 'Resolves with the result of the last task in the iterable',
};

export function Waterfall() {
  return (
    <PageContainer>
      <MiddleContainer>
        <Title>promises-utils.waterfall</Title>
        <Text>Each of these functions are available either from promises-utils or promises-utils.waterfall</Text>

        <SubTitle>promiseWaterfall</SubTitle>
        <Signature>
          {"waterfall(tasks: Array<Task>, options?): PromiseResult<Task[last]>"}
        </Signature>
        <Text>Run Promises in series, each passing its result to the next.</Text>
        <br />
        <Text><b>Arguments</b></Text>
        <KeyValue keyValues={args} />
        <Text><b>Returns</b></Text>
        <KeyValue keyValues={returns} />
        <Text><b>Example</b></Text>
        <br />
        <CodeBlockExample
          text={
`import { promiseWaterfall } from 'promises-utils.waterfall';
// import { promiseWaterfall } from 'promises-utils/waterfall';

const lastResult /** 3 */ = await promiseWaterfall([
  async () => 1,
  async (one) => one + 1,
  async (two) => two + 1,
]);`
          }
        />
        <br />
      </MiddleContainer>
    </PageContainer>
  );
}
