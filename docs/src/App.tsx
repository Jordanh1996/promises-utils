import React, { useMemo } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider, createTheme } from '@material-ui/core/styles';
import { ColorSchemeProvider, useColorScheme } from './context/color-scheme';
import { Router } from './router/router';

function ThemeProviders({ children }: { children: React.ReactNode}) {
  const { isDarkMode } = useColorScheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  );

  return (
    <MaterialUIThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        {children}
      </StyledComponentsThemeProvider>
    </MaterialUIThemeProvider>
  );
}

function App() {
  return (
    <ColorSchemeProvider>
      <ThemeProviders>
        <Router />
      </ThemeProviders>
    </ColorSchemeProvider>
  );
}

export default App;
