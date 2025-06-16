// components/UnhingedBackground.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const generateRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

const NUM_BOXES = 20;

export default function UnhingedBackground() {
  const animatedValues = useRef(
    Array.from({ length: NUM_BOXES }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      rotate: new Animated.Value(Math.random() * 360),
    }))
  ).current;

  useEffect(() => {
    animatedValues.forEach(({ x, y, rotate }) => {
      const loopAnim = () => {
        Animated.parallel([
          Animated.timing(x, {
            toValue: Math.random() * width,
            duration: 2000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(y, {
            toValue: Math.random() * height,
            duration: 2000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: Math.random() * 360,
            duration: 2000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
        ]).start(loopAnim);
      };

      loopAnim();
    });
  }, []);

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { zIndex: 0 }]} // INTE -1
    >
      {animatedValues.map(({ x, y, rotate }, index) => {
        const spin = rotate.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"],
          extrapolate: "extend",
        });

        return (
          <Animated.View
            key={index}
            style={{
              position: "absolute",
              width: 60,
              height: 60,
              backgroundColor: generateRandomColor(),
              transform: [
                { translateX: x },
                { translateY: y },
                { rotate: spin },
              ],
              borderRadius: 30,
              opacity: 0.6,
            }}
          />
        );
      })}
    </View>
  );
}
