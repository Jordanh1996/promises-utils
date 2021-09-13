import React from 'react';
import { CodeBlock, nord } from 'react-code-blocks';

export interface CodeBlockExampleProps {
  text: string;
}

export function CodeBlockExample({ text }: CodeBlockExampleProps) {
  return (
    <div>
      <CodeBlock
        text={text}
        language="typescript"
        showLineNumbers={false}
        theme={nord}
      />
    </div>
  );
}
