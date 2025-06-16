import UnhingedBackground from "@/components/UnhingedBackground";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <UnhingedBackground /> {/* 👈 Lägg till bakgrunden */}
      <View style={styles.content}>
        <Text style={styles.text}>Välkommen till appen!</Text>
        <Button title="Logga in" onPress={() => router.push("/login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
