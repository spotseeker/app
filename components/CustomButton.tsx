import React, { ReactNode } from "react";
import { Pressable, View, Text } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";

const StyledPressable = styled(Pressable);

type CustomButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  variant: "primary" | "secondary" | "gray";
  width: number;
  height: number;
};
//Boton de tres variantes primary con fondo de color gradiente entre #FB9062", "#EE5D6C, otro con fondo blanco y otro para el apartado de perfil de terceros dejar de seguir
function CustomButton({
  children,
  onPress,
  variant,
  width,
  height,
}: CustomButtonProps) {
  return variant == "gray" ? (
    <StyledPressable onPress={onPress} style={{ width: width, height: height }}>
      <LinearGradient
        colors={["#aaaaaa", "#aaaaaa"]}
        style={{ flex: 1, borderRadius: 10 }}
      >
        <View className="flex-1 justify-center items-center">
          <Text
            className={`text-white 
            font-semibold`}
          >
            {children}
          </Text>
        </View>
      </LinearGradient>
    </StyledPressable>
  ) : (
    <StyledPressable onPress={onPress} style={{ width: width, height: height }}>
      <LinearGradient
        colors={
          variant == "primary" ? ["#FB9062", "#EE5D6C"] : ["#FFFFFF", "#FFFFFF"]
        }
        className={`${
          variant == "primary" ? "" : "border-2 border-helper"
        } rounded-lg flex-1`}
      >
        <View className="flex-1 justify-center items-center">
          <Text
            className={`${
              variant == "primary" ? "text-white" : "text-helper"
            } font-semibold`}
          >
            {children}
          </Text>
        </View>
      </LinearGradient>
    </StyledPressable>
  );
}

export default CustomButton;
