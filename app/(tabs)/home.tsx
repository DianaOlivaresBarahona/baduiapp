import PostsList from "@/components/Posts";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <View>
        <ThemedText type="defaultSemiBold">Hem</ThemedText>
        <PostsList />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
