import React from 'react';
import { CodeBlockExample } from '../../components/code';
import { KeyValue } from '../../components/key-value';
import { MiddleContainer } from '../../components/middle-container';
import { Signature } from '../../components/signature';
import { SubTitle, Text, Title } from '../../components/typography';
import { PageContainer } from '../page-container';

const args = {
  'tasks (object)': 'The tasks names are the keys, and their value are either a task, or a task with its dependencies',
  'tasks.key (Function | { task: Function, dependencies: Array<string> }': 'Either a task (no dependencies) or an object with a task and an array of the tasks names that will run first',
  'options.concurrency = Infinity (number) ': 'Whether there should be a limit on the number of concurrency running tasks, defaults to no limit',
};

const returns = {
  'Promise': 'A Promise that resolves with an object, the keys are the tasks names and the values are their results',
};

export function Auto() {
  return (
    <PageContainer>
      <MiddleContainer>
        <Title>@promise/auto</Title>
        <Text>Determines the best order for running the async functions, based on their dependencies</Text>
        <Text>Each function can optionally depend on other functions being completed first, and each function is run as soon as its requirements are satisfied</Text>
        <Text>Every task call will get the results of the completed tasks in an object as it's first argument</Text>
        <Text>If an error is thrown in any of the tasks then the execution stops and the error object should hold the successfull results</Text>

        <SubTitle>promiseAuto</SubTitle>
        <Signature>
          {"promiseAuto(tasks: TasksObject, options?): Promise<ResultsObject>"}
        </Signature>
        <Text>Returns a Promise that resolves with the tasks results</Text>
        <br />
        <Text><b>Arguments</b></Text>
        <KeyValue keyValues={args} />
        <Text><b>Returns</b></Text>
        <KeyValue keyValues={returns} />
        <Text><b>Example</b></Text>
        <br />
        <CodeBlockExample
          text={
`import { promiseAuto } from '@promise/auto';
// import { promiseAuto } from '@promise/utils/auto';

const results = await promiseAuto({
  getData: async () => {
    // async stuff
    return 'data';
  },
  makeFolder: async () => {
    // async stuff
    return 'folder';
  },
  writeFile: {
    dependencies: ['getData', 'makeFolder'],
    task: async ({
      getData, // 'data'
      makeFolder, // 'folder'
    }) => {
      return 'file';
    }
  },
  emailLink: {
    dependencies: ['getData'],
    task: async ({
      getData, // 'data'
    }) => {
      return 'email';
    }
  },
});

console.log(results); // {
//  getData: 'data',
//  makeFolder: 'folder',
//  writeFile: 'file',
//  emailLink: 'email',
// }
`
          }
        />
        <br />
      </MiddleContainer>
    </PageContainer>
  );
}
