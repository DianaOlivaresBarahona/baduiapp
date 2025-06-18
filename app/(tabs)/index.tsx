import UnhingedBackground from "@/components/UnhingedBackground";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const xDir = useRef(1);
  const yDir = useRef(1);
  const posX = useRef(0);
  const posY = useRef(0);

  useEffect(() => {
    const buttonSize = 100;

    const animate = () => {
      posX.current += xDir.current * 3;
      posY.current += yDir.current * 3;

      if (posX.current < 0 || posX.current > width - buttonSize) {
        xDir.current *= -1;
        posX.current = Math.max(0, Math.min(posX.current, width - buttonSize));
      }

      if (posY.current < 0 || posY.current > height - buttonSize) {
        yDir.current *= -1;
        posY.current = Math.max(0, Math.min(posY.current, height - buttonSize));
      }

      Animated.parallel([
        Animated.timing(x, {
          toValue: posX.current,
          duration: 16,
          useNativeDriver: false,
        }),
        Animated.timing(y, {
          toValue: posY.current,
          duration: 16,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [x, y]);

  return (
    <View style={{ flex: 1 }}>
      <UnhingedBackground />
      <View style={styles.content}>
        <Text style={styles.text}>Välkommen till appen!</Text>
      </View>

      <Animated.View
        style={[
          styles.bouncer,
          { transform: [{ translateX: x }, { translateY: y }] },
        ]}
      >
        <TouchableWithoutFeedback onPress={() => router.push("/login")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
  },
  bouncer: {
    position: "absolute",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#D505F6",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
