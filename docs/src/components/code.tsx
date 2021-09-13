import React from 'react';
import styled from 'styled-components';
import { CodeBlock, CopyBlock, nord } from 'react-code-blocks';

export interface CodeProps {
  fontSize?: string;
  text: string;
}

const Font = styled.div<{ fontSize?: string }>`
  font-size: ${props => props.fontSize ? props.fontSize : '18px'};
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
`;

export function CodeBlockExample({ text, fontSize }: CodeProps) {
  return (
    <Font fontSize={fontSize}>
      <CodeBlock
        text={text}
        language="typescript"
        showLineNumbers={false}
        theme={nord}
      />
    </Font>
  );
}

export function ShellCodeExample({ text }: CodeProps) {
  return (
    <Font fontSize="16px">
      <CopyBlock
        text={text}
        language="shell"
        showLineNumbers={false}
        theme={nord}
        codeBlock
      />
    </Font>
  )
}
