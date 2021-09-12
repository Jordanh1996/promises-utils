import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const items = [
  {
    url: '/docs/auto',
    label: 'Auto',
  },
  {
    url: '/docs/throttle',
    label: 'Throttle',
  },
  {
    url: '/docs/wait',
    label: 'Wait',
  },
  {
    url: '/docs/waterfall',
    label: 'Waterfall',
  },
];

const ItemsContainer = styled.div`
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
`;

const ItemsTitle = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  &:active, &:focus, &:hover, &:visited {
    color: black;
  }
`;

const Item = styled(Link)`
  font-size: 16px;
  margin: 8px 0;
  padding: 4px 16px;
  color: black;
  text-decoration: none;
  &:active, &:focus, &:hover, &:visited {
    color: black;
  }
`;

export function NavigationItems() {

  
  return (
    <ItemsContainer>
      <ItemsTitle to="/">
        Getting Started
      </ItemsTitle>
      <ItemsTitle to="/">
        Utils
      </ItemsTitle>
      {
        items.map(({ url, label }, i) => (
          <Item to={url} key={i}>
            {label}
          </Item>
        ))
      }
    </ItemsContainer>
  );
}
