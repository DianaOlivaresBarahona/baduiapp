import PostsList from "@/components/Posts";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold">Hem</ThemedText>
      <PostsList />
    </ThemedView>
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
