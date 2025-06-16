import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebase-config";

const { width, height } = Dimensions.get("window");
const bgColors = ["#ffffff", "#ffe6e6", "#e6ffe6", "#e6f0ff", "#fff9e6"];

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonX, setButtonX] = useState(100);
  const [buttonY, setButtonY] = useState(500);
  const [clicks, setClicks] = useState(0);

  const bgColorAnim = useRef(new Animated.Value(0)).current;
  const twitchAnim = useRef(new Animated.Value(0)).current;

  const moveButtonRandomly = () => {
    const randomX = Math.floor(Math.random() * (width - 150));
    const randomY = Math.floor(Math.random() * (height - 250)) + 150;
    setButtonX(randomX);
    setButtonY(randomY);
  };

  const handleButtonPress = async () => {
    const newCount = clicks + 1;
    setClicks(newCount);
    moveButtonRandomly();

    if (newCount >= 5) {
      setClicks(0);
      await handleSave();
    }
  };

  const handleSave = async () => {
    const auth = getAuth();
    setLoading(true);
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: profilePicture,
      });
      await auth.currentUser?.reload();
      setLoading(false);
      Alert.alert("🎉 Profil uppdaterad efter 5 träffar!");
    } catch (error) {
      console.error(error);
      Alert.alert("Fel vid uppdatering");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setDisplayName(firebaseUser.displayName || "");
        setProfilePicture(firebaseUser.photoURL || "");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(moveButtonRandomly, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate background color
  useEffect(() => {
    Animated.loop(
      Animated.sequence(
        bgColors.map((_, index) =>
          Animated.timing(bgColorAnim, {
            toValue: index,
            duration: 1200,
            useNativeDriver: false,
          })
        )
      )
    ).start();
  }, [bgColorAnim]);

  // Animate twitch motion
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(twitchAnim, {
          toValue: 5,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(twitchAnim, {
          toValue: -5,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(twitchAnim, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [twitchAnim]);

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: bgColors.map((_, i) => i),
    outputRange: bgColors,
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Laddar...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Du är inte inloggad</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text>Hej {user.displayName}</Text>
      <Image source={{ uri: user.photoURL || "" }} style={styles.profilePic} />

      <Animated.View style={{ transform: [{ translateX: twitchAnim }] }}>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Ditt fullständiga namn"
        />
      </Animated.View>

      <Animated.View style={{ transform: [{ translateX: twitchAnim }] }}>
        <TextInput
          style={styles.input}
          value={profilePicture}
          onChangeText={setProfilePicture}
          placeholder="Bild Url"
        />
      </Animated.View>

      <Text style={styles.counterText}>
        🎯 Fånga knappen för att spara ändringar ({clicks} / 5)
      </Text>

      <TouchableOpacity
        style={[
          styles.editButton,
          { position: "absolute", left: buttonX, top: buttonY },
        ]}
        onPress={handleButtonPress}
      >
        <Text style={styles.editButtonText}>🎯 Fånga mig!</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: "center",
    flex: 1,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 60,
    marginBottom: 55,
    marginTop: 55,
    backgroundColor: "#ddd",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  editButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 4,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
  },
  counterText: {
    marginTop: 10,
    fontSize: 16,
  },
});
