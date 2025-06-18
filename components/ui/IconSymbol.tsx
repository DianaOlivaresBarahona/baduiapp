import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

type IconSymbolName =
  | "house.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "person"
  | "login.fill"
  | "logout";

const MAPPING: Record<
  IconSymbolName,
  ComponentProps<typeof MaterialIcons>["name"]
> = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  person: "person",
  "login.fill": "login",
  logout: "logout",
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name];

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={iconName ?? "help-outline"}
      style={style}
    />
  );
}
