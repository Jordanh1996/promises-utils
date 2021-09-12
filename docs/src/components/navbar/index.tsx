import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import GitHubIcon from '@material-ui/icons/GitHub';
import BrightModeIcon from '@material-ui/icons/Brightness7';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import { useColorScheme } from '../../context/color-scheme';
import { JSLogo } from './js-logo';

const ToolbarLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToolbarLeftSideContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToolbarRightSideTitle = styled.div`
  margin-left: 14px;
  font-size: 20px;
  font-weight: 600;
`;

export function Navbar() {
  const { isDarkMode, toggleColorScheme } = useColorScheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <ToolbarLayout>
          <ToolbarLeftSideContainer>
            <JSLogo size={28} fill="#fff" />
            <ToolbarRightSideTitle>Promise Utils</ToolbarRightSideTitle>
          </ToolbarLeftSideContainer>

          <div>
            <Tooltip title={isDarkMode ? 'Switch to bright mode' : 'Switch to dark mode'}>
              <IconButton aria-label="theme" color="inherit" onClick={toggleColorScheme}>
                {isDarkMode ? <DarkModeIcon /> : <BrightModeIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="GitHub repository">
              <IconButton
                aria-label="github"
                color="inherit"
                onClick={() =>
                  window.open('https://github.com/Jordanh1996/promise-utils', '_blank')?.focus()
                }
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </div>
        </ToolbarLayout>
      </Toolbar>
    </AppBar>
  );
}
