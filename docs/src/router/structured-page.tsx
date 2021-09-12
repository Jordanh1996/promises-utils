import React from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/navbar';
import { SideBar } from '../components/sidebar';

const ColumnContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export function structuredPage(Component: React.ComponentType) {
  return function StructuredPageComponent() {
    return (
      <ColumnContainer>
        <Navbar />
        <RowContainer>
          <SideBar />
          <Component />
        </RowContainer>
      </ColumnContainer>
    );
  }
}
