import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen: React.FC = () => {
  const router = useRouter();

  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/home");
  };

  return (
    <Onboarding
      onSkip={finishOnboarding}
      onDone={finishOnboarding}
      transitionAnimationDuration={500}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      pages={[
        {
          backgroundColor: "#f0f4ff",
          image: (
            <Image
              source={require("../assets/images/welcome.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
          ),
          title: "Välkommen!",
          subtitle: "Har du tråkigt? Här blir det rävligt kul!",
        },
        {
          backgroundColor: "#fff3e6",
          image: (
            <Image
              source={require("../assets/images/explore.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
          ),
          title: "Utforska",
          subtitle: "Anakin hatar sand, men vi? Vi kamel-lar genom öknen.",
        },
        {
          backgroundColor: "#ffeef2",
          image: (
            <Image
              source={require("../assets/images/get-started.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
          ),
          title: "Kom igång!",
          subtitle:
            "Skogstokig? Då har du kommit helt rätt! Tryck på 'Klar' för att börja din resa.",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 240,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "#555",
  },
});

export default OnboardingScreen;
