import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen: React.FC = () => {
  const router = useRouter();

  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/home"); // Skicka vidare till hemskärmen
  };

  return (
    <Onboarding
      onSkip={finishOnboarding}
      onDone={finishOnboarding}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/images/onboarding.jpg")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          ),
          title: "Välkommen!",
          subtitle: "Det här är en enkel onboarding",
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              source={require("../assets/images/onboarding.jpg")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          ),
          title: "Utforska",
          subtitle: "Vi visar dig runt i appen",
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image
              source={require("../assets/images/onboarding.jpg")}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          ),
          title: "Kom igång!",
          subtitle: "Tryck på 'Klar' för att starta",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
