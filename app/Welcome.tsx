import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Icons from "@/components/Icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import Screen from "@/components/Screen";
import { router } from "expo-router";


export default function Welcome(){
  const {LogoBigIcon}=Icons;
  return(
    <LinearGradient
    colors={[
       'rgba(106, 13, 131,1)',
       'rgba(206, 73, 147, 1)',
       'rgba(251, 144, 98, 0.9)',
       'rgba(255, 255, 255, 1)'
     ]}
     start={{ x: 0, y: 0 }} // De arriba...
     end={{ x: 0, y: 1 }} // ... hacia abajo
     locations={[0, 0.3, 0.5, 0.8]}
     >
      <SafeAreaView className="h-full">
      <ScrollView>
        <Screen>
        <View className="flex justify-center items-center">
            <Text className="text-lightc font-pbold text-[17px]">
              Empieza a compartir tus Aventuras En
            </Text>
            <LogoBigIcon width={241} height={399} mr={29} />
            <CustomButton
              width={326}
              height={47}
              variant="primary"
              onPress={() => router.push("/(tabs)/Home")}
            >
             Continuar
            </CustomButton>
          </View>
        </Screen>

      </ScrollView>
    </SafeAreaView>
     </LinearGradient>
  );

}