import { ThemeProvider, useThemeToggle } from "@/context/ThemeContext";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";

function InnerLayout() {
  const { theme } = useThemeToggle();

  return (
    <NavigationThemeProvider value={theme.navigation}>
      <Slot />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}
