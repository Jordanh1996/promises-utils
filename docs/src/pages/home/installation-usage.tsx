import React from 'react';
import styled from 'styled-components';
import { CodeBlock, nord } from 'react-code-blocks';
import GetAppIcon from '@material-ui/icons/GetApp';
import CodeIcon from '@material-ui/icons/Code';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

const Card = styled.div`
  padding: 24px 24px 0px 24px;
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 #aaaaaa;
  margin: 8px 20px 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  max-width: 500px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 12px;
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 28px;
`;

const CodeBlockContainer = styled.div`
  margin: 8px 0;
`;

const CardFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HorizontalLine = styled.div`
  height: 0;
  width: 100%;
  border-top: 1px solid #808080;
  margin-top: 32px;
`;

const CardFooterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 8px 0;
`;

function CardFooter({ text, onClick }: { text: string; onClick: any }) {
  return (
    <CardFooterContainer>
      <HorizontalLine />
      <CardFooterButtonContainer>
        <Button color="primary" onClick={onClick}>{text}</Button>
      </CardFooterButtonContainer>
    </CardFooterContainer>
  );
}

function Installation() {
  const history = useHistory();

  return (
    <Card>
      <div>
        <TitleContainer>
          <GetAppIcon color="primary" fontSize="large" />
          <Title>Installation</Title>
        </TitleContainer>
        <Text>Install @promise/utils via npm</Text>
        <CodeBlockContainer>
          <CodeBlock
            text="npm install @promise/utils"
            language="shell"
            showLineNumbers={false}
            theme={nord}
          />
        </CodeBlockContainer>
        <br />
        <Text>or install any of the compounding packages.</Text>
        <Text>for example:</Text>
        <CodeBlockContainer>
          <CodeBlock
            text="npm install @promise/wait"
            language="shell"
            showLineNumbers={false}
            theme={nord}
          />
        </CodeBlockContainer>
      </div>
      <CardFooter text={'read installation documentation'} onClick={() => history.push('/installation')} />
    </Card>
  );
}

function Usage() {
  const history = useHistory();

  return (
    <Card>
      <div>
        <TitleContainer>
          <CodeIcon color="primary" fontSize="large" />
          <Title>Usage</Title>
        </TitleContainer>
        <Text>First install @promise/utils or @promise/wait</Text>
        <CodeBlockContainer>
          <CodeBlock
            text={
`import { wait } from '@promise/utils';
// import { wait } from '@promise/wait';

async function main() {
  await wait(1000);

  console.log('after 1 second');
}`
            }
            language="js"
            showLineNumbers={false}
            theme={nord}
          />
        </CodeBlockContainer>
      </div>
      <CardFooter text={"go to function documentation"} onClick={() => history.push('/')} />
    </Card>
  );
}

const InstallationUsageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  @media (max-width: 1400px) {
    flex-direction: column;
    align-items: center;
  }
`;

export function InstallationUsage() {
  return (
    <InstallationUsageContainer>
      <Installation />
      <Usage />
    </InstallationUsageContainer>
  );
}
