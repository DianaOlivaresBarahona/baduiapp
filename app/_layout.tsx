import UnhingedBackground from "@/components/UnhingedBackground";
import { ThemeProvider, useThemeToggle } from "@/context/ThemeContext";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { View } from "react-native";

function InnerLayout() {
  const { theme } = useThemeToggle();

  return (
    <NavigationThemeProvider value={theme.navigation}>
      <View style={{ flex: 1 }}>
        <UnhingedBackground />
        <Slot />
      </View>
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
