// hooks/useThemeColor.ts
import { useThemeToggle } from "@/context/ThemeContext";

export function useThemeColor(
  key: keyof ReturnType<typeof useThemeToggle>["theme"]["colors"]
) {
  const { theme } = useThemeToggle();
  return theme.colors[key];
}
