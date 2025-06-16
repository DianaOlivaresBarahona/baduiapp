import LoginForm from "@/components/LoginForm";
import UnhingedBackground from "@/components/UnhingedBackground";
import { View } from "react-native";

export default function LoginPage() {
  return (
    <View style={{ flex: 1 }}>
      <LoginForm />
      <UnhingedBackground />
    </View>
  );
}
