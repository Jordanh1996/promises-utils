import React from 'react';
import styled from 'styled-components';
import { NavigationItems } from './navigation-items';
import { SearchInput } from './search-input';

const Container = styled.div`
  height: 100%;
  width: 240px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 4px 4px 0 rgb(0 0 0 / 20%);
`;

export function SideBar() {
  return (
    <Container>
      {/* <SearchInput /> */}
      <NavigationItems />
    </Container>
  );
}
