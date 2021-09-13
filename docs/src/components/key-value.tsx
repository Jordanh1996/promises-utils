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
  color: ${props => props.theme.palette.primary.main};
  margin: 4px 0;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export function KeyValue({ keyValues }: KeyValueProps) {
  const keyValuesJSX = Object.entries(keyValues).map(([key, value]) => (
    <Row key={key}>
      <Key>{key}:	&nbsp;</Key>
      <Text>{value}</Text>
    </Row>
  ));

  return (
    <Container>
      {keyValuesJSX}
    </Container>
  );
}
