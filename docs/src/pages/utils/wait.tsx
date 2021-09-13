import React from 'react';
import { CodeBlockExample } from '../../components/code-example';
import { KeyValue } from '../../components/key-value';
import { MiddleContainer } from '../../components/middle-container';
import { Signature } from '../../components/signature';
import { SubTitle, Text, Title } from '../../components/typography';
import { PageContainer } from '../page-container';

const args = {
  'time (number)': 'The amount of time until the returned Promise resolves',
  'options.timeUnit = \'ms\' (TimeUnit / string)': 'The unit of the given time. e.g: seconds / milliseconds etc',
  'options.reject = false (boolean) ': 'Whether the Promise should reject instead of resolving',
};

const returns = {
  'Promise': 'A Promise that resolves after the given time',
};

const timeUnitValues = {
  'UNITS.MS (string)': '\'ms\' - milliseconds',
  'UNITS.S (string)': '\'s\' - seconds',
  'UNITS.M (string)': '\'m\' - minutes',
  'UNITS.H (string)': '\'h\' - hours',
  'UNITS.D (string)': '\'d\' - days',
};

export function Wait() {
  return (
    <PageContainer>
      <MiddleContainer>
        <Title>@promise/wait</Title>
        <Text>Each of these functions are available either from @promise/utils or @promise/wait</Text>

        <SubTitle>wait</SubTitle>
        <Signature>
          {"wait(time: number, options?): Promise<void>"}
        </Signature>
        <Text>Returns a Promise that resolves after the given time</Text>
        <br />
        <Text><b>Arguments</b></Text>
        <KeyValue keyValues={args} />
        <Text><b>Returns</b></Text>
        <KeyValue keyValues={returns} />
        <Text><b>Example</b></Text>
        <br />
        <CodeBlockExample
          text={
`import { wait, UNITS } from '@promise/wait';
// import { wait, UNITS } from '@promise/utils/wait';

await wait(1000);
console.log('after 1 second');

await wait(10, { timeUnit: UNITS.S });
console.log('after 10 seconds');`
          }
        />
        <br />

        <SubTitle>UNITS</SubTitle>
        <Text>Utility constants for time units</Text>
        <br />
        <Text><b>Values</b></Text>
        <KeyValue keyValues={timeUnitValues} />
        <br />
      </MiddleContainer>
    </PageContainer>
  );
}
