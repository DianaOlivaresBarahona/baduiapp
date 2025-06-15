import { AppTheme, darkTheme, lightTheme } from "@/constants/theme";
import React, { createContext, ReactNode, useContext, useState } from "react";

const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
  theme: AppTheme;
}>({
  isDark: true,
  toggleTheme: () => {},
  theme: darkTheme,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => useContext(ThemeContext);
