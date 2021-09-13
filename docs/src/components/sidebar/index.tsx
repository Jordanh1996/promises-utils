import React from 'react';
import styled from 'styled-components';
import { NavigationItems } from './navigation-items';

const Container = styled.div`
  height: calc(100% - 64px);
  width: 240px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 4px 4px 0 rgb(0 0 0 / 20%);
  background: white;
`;

export function SideBar() {
  return (
    <Container>
      <NavigationItems />
    </Container>
  );
}
