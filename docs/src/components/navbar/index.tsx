import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import BrightModeIcon from '@material-ui/icons/Brightness7';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import { useColorScheme } from '../../context/color-scheme';

const ToolbarLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function Navbar() {
  const { isDarkMode, toggleColorScheme } = useColorScheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <ToolbarLayout>
          <Typography variant="h6">Promise Utils</Typography>

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
