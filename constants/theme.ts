import {
  DarkTheme as NavigationDark,
  DefaultTheme as NavigationDefault,
  Theme as NavigationTheme,
} from "@react-navigation/native";

type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
  notification: string;
  button: string;
  // Lägg till fler om du vill, t.ex. button, link, etc.
};

export type AppTheme = {
  navigation: NavigationTheme;
  colors: ThemeColors;
};

export const lightTheme: AppTheme = {
  navigation: {
    ...NavigationDefault,
    colors: {
      ...NavigationDefault.colors,
      background: "#ffffff",
      text: "#000000",
      primary: "#6200ee",
      card: "#f5f5f5",
      border: "#cccccc",
      notification: "#ff80ab",
    },
  },
  colors: {
    background: "#ffffff",
    text: "#000000",
    primary: "#6200ee",
    card: "#f5f5f5",
    border: "#cccccc",
    notification: "#ff80ab",
    button: "#DADADA",
  },
};

export const darkTheme: AppTheme = {
  navigation: {
    ...NavigationDark,
    colors: {
      ...NavigationDark.colors,
      background: "#121212",
      text: "#ffffff",
      primary: "#bb86fc",
      card: "#1f1f1f",
      border: "#272727",
      notification: "#ff4081",
    },
  },
  colors: {
    background: "#121212",
    text: "#ffffff",
    primary: "#bb86fc",
    card: "#1f1f1f",
    border: "#272727",
    notification: "#ff4081",
    button: "#5A5A5A",
  },
};
