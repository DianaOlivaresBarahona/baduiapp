import { useThemeToggle } from "@/context/ThemeContext";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { theme } = useThemeToggle();
  const backgroundColor = theme.colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
