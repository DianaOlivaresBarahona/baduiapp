import PostsList from "@/components/Posts";
import { useThemeToggle } from "@/context/ThemeContext";
import { StyleSheet, Text } from "react-native";

export default function HomeScreen() {
   const { theme } = useThemeToggle();
  return (
    <>
      <Text style={{ color: theme.colors.text }}>Hem</Text>
      <PostsList />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    overflow: "hidden",
  },
});
