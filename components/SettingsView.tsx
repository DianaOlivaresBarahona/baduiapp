import Toggle from "@/components/Toggle";
import { useThemeToggle } from "@/context/ThemeContext";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useThemeToggle();
  const { theme } = useThemeToggle();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Inställningar
      </Text>

      <View style={styles.row}>
        <Text style={{ color: theme.colors.text }}>Dark Mode</Text>

        <Toggle value={isDark} onToggle={toggleTheme} />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
      >
        <Text style={{ color: theme.colors.text }}>Kontouppgifter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
      >
        <Text style={{ color: theme.colors.text }}>Ta bort konto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
});
