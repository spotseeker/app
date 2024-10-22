import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { router } from "expo-router";
import Icons from "@/components/Icons";
import CustomButton from "@/components/CustomButton";
import CustomInputs from "@/components/CustomInputs";
import { LoginSchema } from "@/Schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Screen from "@/components/Screen";
import { Link } from "expo-router";

export default function SignIn() {
  const { LogoIcon } = Icons;
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <Screen>
          <View className="flex justify-center items-center">
            <Text className="text-lightc font-pbold text-[14px]">
              ¡Hola de nuevo viajero!
            </Text>
            <LogoIcon width={200} height={200} mr={15} />
          </View>
          <View className="flex justify-center items-center ">
            <CustomInputs variant="email" control={control} name="username">
              Introduce usuario
            </CustomInputs>
            <CustomInputs variant="password" control={control} name="password">
              Introduce contraseña
            </CustomInputs>
          </View>
          <View className="flex justify-end items-end p-5">
            <Link asChild href={"/Recovery-password"}>
              <Text className="font-psemibold text-helper underline pb-5">
                Recuperar mi clave
              </Text>
            </Link>
            <CustomButton
              width={326}
              height={47}
              variant="primary"
              onPress={
                handleSubmit(() => {
                  reset()
                  router.push("/(tabs)/Home")
                })
              }
            >
              Ingresar
            </CustomButton>
          </View>
          <View className="flex flex-row space-x-[-20px] justify-center items-center">
            <Text className="font-psemibold p-5">¿No posees cuenta?</Text>

            <Link asChild href={"/Sign-up"}>
              <Text className="font-psemibold text-helper underline p-5">
                Registrate Aqui
              </Text>
            </Link>
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
  );
}
