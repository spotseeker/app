import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type CustomButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  variant: "primary" | "secondary" | "gray";
  width: number;
  height: number;
};

function CustomButton({
  children,
  onPress,
  variant,
  width,
  height,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7} // Cambia la opacidad al presionar
      style={{ width: width, height: height }}
    >
      <LinearGradient
        colors={
          variant === "primary" ? ["#FB9062", "#EE5D6C"] : ["#FFFFFF", "#FFFFFF"]
        }
        style={{ flex: 1, borderRadius: 10 }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: variant === "primary" ? "white" : "black",
              fontWeight: "600",
            }}
          >
            {children}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default CustomButton;

