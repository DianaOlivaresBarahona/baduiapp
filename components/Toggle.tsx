import React from "react";
import { StyleSheet, Switch } from "react-native";

type ToggleProps = {
  value: boolean;
  onToggle: () => void;
};

const Toggle = ({ value, onToggle }: ToggleProps) => {
  return (
    <Switch
      trackColor={{ false: "#767577", true: "#bb86fc" }}
      thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onToggle}
      value={value}
    />
  );
};

export default Toggle;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
