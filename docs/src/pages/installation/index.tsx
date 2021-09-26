import React from 'react';
import styled from 'styled-components';
import { PageContainer } from '../page-container';
import { MiddleContainer } from '../../components/middle-container';
import { ShellCodeExample } from '../../components/code';

const Title = styled.div`
  font-size: 36px;
  margin: 40px 0 10px 0;
`;

const SubTitle = styled.div`
  font-size: 28px;
  margin: 20px 0;
`;

const Text = styled.div`
  font-size: 16px;
  margin: 8px 0;
`;

// const CDN_LINK = 'https://unpkg.com';

export function Installation() {
  return (
    <PageContainer>
      <MiddleContainer>
        <Title>Installation</Title>
        <SubTitle>Install promises-utils and stop copy-pasting your utility functions</SubTitle>
        <Text>promises-utils is available as an npm package:</Text>
        <ShellCodeExample
          text="npm install promises-utils"
        />
        <br />
        <Text>You can also install it via yarn:</Text>
        <ShellCodeExample
          text="yarn add promises-utils"
        />
        <br />
        <SubTitle>Saving installation time</SubTitle>
        <Text>Instead of installing all of the utils, you can install any of the compounding small pacakges instead. e.g:</Text>
        <ShellCodeExample
          text={
`npm install promises-utils.wait
npm install promises-utils.throttle
npm install promises-utils.auto`
          }
        />
        <br />
        {/* <SubTitle>CDN</SubTitle>
        <Text>You can start using promises-utils with minimal Front-end infrastructure.</Text>
        <Text>The module is available from a CDN using the following: {CDN_LINK}</Text>
        <Text>You can add this as a script tag to your HTML:</Text>
        <CodeBlock
          text={`<script src="${CDN_LINK}" crossorigin="anonymous"></script>`}
          language="html"
          showLineNumbers={false}
          theme={nord}
        /> */}
      </MiddleContainer>
    </PageContainer>
  );
}
