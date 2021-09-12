import React, { useContext, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface ColorSchemeContextData {
  isDarkMode: boolean;
  toggleColorScheme: () => void;
}

const ColorSchemeContext = React.createContext<ColorSchemeContextData>({} as ColorSchemeContextData);

export function ColorSchemeProvider({ children }: { children: React.ReactNode}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  return (
    <ColorSchemeContext.Provider
      value={{
        isDarkMode,
        toggleColorScheme: () => setIsDarkMode(!isDarkMode),
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme() {
  const contextData = useContext(ColorSchemeContext);

  return contextData;
}
