import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icons from "@/components/Icons";
export default function Loading() {
  const { LogoIcon } = Icons;
  return (
    <LinearGradient
      colors={["rgba(251, 144, 98, 0.1)", "rgba(251, 144, 98, 1)"]} // Color blanco arriba y #FB9062 abajo
      start={{ x: 0, y: 0 }} // De abajo...
      end={{ x: 0, y: 1 }} // ... hacia arriba
      locations={[0.4, 1]}
      className="flex-1  justify-center items-center"
    >
      <View className="mt-[-100px] ">
        <LogoIcon width={241} height={375} mr={25} />
      </View>
      <View className="flex justify-center items-center">
        <Text className="text-coloricon  text-[16px] font-pbold mt-[-50px]">
          Donde tus destinos cobran vida.
        </Text>
      </View>
    </LinearGradient>
  );
}
