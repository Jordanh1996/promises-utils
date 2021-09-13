import React from 'react';
import styled from 'styled-components';
import { Text } from './typography';

export interface KeyValueProps {
  keyValues: Record<string, string>;
}

const Container = styled.div`
  margin: 12px;
`;

const Key = styled(Text)`
  display: inline;
  color: ${props => props.theme.palette.primary.main};
  margin: 4px 0;
  font-weight: 600;
`;

export function KeyValue({ keyValues }: KeyValueProps) {
  const keyValuesJSX = Object.entries(keyValues).map(([key, value]) => (
    <Text key={key}>
      <Key>{key}:	&nbsp;</Key>{value}
    </Text>
  ));

  return (
    <Container>
      {keyValuesJSX}
    </Container>
  );
}
