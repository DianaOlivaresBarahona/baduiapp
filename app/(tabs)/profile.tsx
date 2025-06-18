import ProfilePage from "@/components/ProfilePage";
import UnhingedBackground from "@/components/UnhingedBackground";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <UnhingedBackground />
      <ProfilePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
