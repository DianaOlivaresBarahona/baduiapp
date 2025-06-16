import { useThemeToggle } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebase-config";
import { styles } from "./LoginFormStyles";

const glitchColors = ["#FF00FF", "#00FFFF", "#FF3300", "#00FF33"];

const getRandomGlitchColor = () =>
  glitchColors[Math.floor(Math.random() * glitchColors.length)];

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  const { theme } = useThemeToggle();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  // Animated values
  const glitchAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const blinkOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Glitch color cycling
    Animated.loop(
      Animated.sequence([
        Animated.timing(glitchAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(glitchAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ])
    ).start();

    // Rotate inputs
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();

    // Blink button opacity
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkOpacity, {
          toValue: 0.1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(blinkOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();
  }, [glitchAnim, rotateAnim, blinkOpacity]);

  // Interpolate glitch color for labels
  const glitchColor = glitchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#00FFAA", getRandomGlitchColor()],
  });

  // Interpolate rotation for inputs
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "5deg"],
  });

  const handleSubmit = async () => {
    if (!isLogin && password !== confirmPassword) {
      alert("Lösenorden matchar inte");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("/onboarding");
        return;
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");

      if (hasSeenOnboarding !== "true") {
        router.replace("/onboarding");
      } else {
        router.replace("/home");
      }
    } catch {
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Logga in" : "Skapa konto"}</Text>

      <Animated.Text style={[styles.label, { color: glitchColor }]}>
        E-post
      </Animated.Text>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Din e-post"
          placeholderTextColor="#888"
        />
      </Animated.View>

      <Animated.Text style={[styles.label, { color: glitchColor }]}>
        Lösenord
      </Animated.Text>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Din lösenord"
          placeholderTextColor="#888"
        />
      </Animated.View>

      {!isLogin && (
        <>
          <Animated.Text style={[styles.label, { color: glitchColor }]}>
            Bekräfta lösenord
          </Animated.Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Bekräfta lösenord"
              placeholderTextColor="#888"
            />
          </Animated.View>
        </>
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Animated.View style={{ opacity: blinkOpacity }}>
        <TouchableOpacity
          style={[styles.button, !isFormValid && { backgroundColor: "#555" }]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>
            {isLogin ? "Logga in" : "Registrera"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin
              ? "Har du inget konto? Registrera dig här"
              : "Har du redan ett konto? Logga in här"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
