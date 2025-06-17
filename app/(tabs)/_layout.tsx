import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleAuthPress = async () => {
    if (user) {
      await logout();
      router.replace("/"); // Go back to index after logout
    } else {
      router.push("/"); // Also go to index to hit the bouncing login button
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={handleAuthPress}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <IconSymbol
                  size={28}
                  name={user ? "logout" : "login.fill"}
                  color={props.accessibilityState?.selected ? "blue" : "gray"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: props.accessibilityState?.selected ? "blue" : "gray",
                  }}
                >
                  {user ? "Log Out" : "Log In"}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
