import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
`;

const ItemsTitle = styled(Link)<{ isActive?: boolean }>`
  font-size: ${props => props.isActive ? '20px' : '18px'};;
  font-weight: 600;
  margin: 8px 0;
  padding: 8px 0;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  border-left: ${props => props.isActive ? `3px solid ${props.theme.palette.primary.main}` : 'none'};
  margin-left: 24px;
  padding-left: 16px;
  &:active, &:focus, &:hover, &:visited {
    color: black;
  }
`;

const Item = styled(Link)<{ isActive?: boolean }>`
  font-size: 16px;
  margin: 8px 0;
  padding: 4px 16px;
  color: black;
  text-decoration: none;
  font-weight: ${props => props.isActive ? 600 : 400};
  border-left: ${props => props.isActive ? `3px solid ${props.theme.palette.primary.main}` : 'none'};
  margin-left: 24px;
  padding-left: 28px;
  &:active, &:focus, &:hover, &:visited {
    color: black;
  }
`;

function isActive(path: string, to: string) {
  return path === to;
}

export function NavigationItems() {
  const history = useHistory();
  
  return (
    <ItemsContainer>
      <ItemsTitle to="/" isActive={isActive(history.location.pathname, '/')}>
        Introduction
      </ItemsTitle>
      <ItemsTitle to="/installation" isActive={isActive(history.location.pathname, '/installation')}>
        Installation
      </ItemsTitle>
      <ItemsTitle to={history.location.pathname} isActive={false}>
        Utils
      </ItemsTitle>
      {
        items.map(({ url, label }, i) => (
          <Item to={url} key={i} isActive={isActive(history.location.pathname, url)}>
            {label}
          </Item>
        ))
      }
    </ItemsContainer>
  );
}
