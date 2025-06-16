import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebase-config"; // Justera sökväg om det behövs

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const auth = getAuth();
    setLoading(true);
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: profilePicture,
      });
      auth.currentUser?.reload();
      setLoading(false);
      Alert.alert("Profil uppdaterad!");
    } catch (error) {
      console.error(error);
      Alert.alert("Fel vid uppdatering");
    }
  };

  // Hämta användare och instagram-länk från Firebase
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
        setUser(firebaseUser);
        setDisplayName(firebaseUser.displayName || "");
        setProfilePicture(firebaseUser.photoURL || "");
        setLoading(false);
      }
    });
  }, []);

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

  // const profilePic =
  //  user.photoURL || "https://randomuser.me/api/portraits/lego/1.jpg";

  return (
    <View style={styles.container}>
      <Text>Hej {user.displayName}</Text>
      <Image source={{ uri: user.photoURL || "" }} style={styles.profilePic} />

      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Ditt fullständiga namn"
      />

      <TextInput
        style={styles.input}
        value={profilePicture}
        onChangeText={setProfilePicture}
        placeholder="Bild Url"
      />

      <TouchableOpacity style={styles.editButton} onPress={handleSave}>
        <Text style={styles.editButtonText}>Spara ändringar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginBottom: 30,
  },
  socialText: {
    color: "#1E90FF",
    fontSize: 16,
    marginHorizontal: 10,
    textDecorationLine: "underline",
  },
  editButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
  },
});
