import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import Icons from "@/components/Icons";
import Screen from "@/components/Screen";
import { ResetPasswordSchema } from "@/Schemas/UserSchema";
import CustomInputs from "@/components/CustomInputs";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

export default function RecoveryFunction(){
    const { LockIcon } = Icons
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(ResetPasswordSchema),
      });

    return (
        <ScrollView>
            <Screen>
                <View className="flex justify-center items-center">
                    <Text className="text-helper font-pbold text-[20px] mb-5">
                        ¡Hora de cambiar la contraseña!
                    </Text>
                    <LockIcon/>
                    <Text className="text-lightc font-pbold text-[16px] mt-5">
                        Introduce la nueva contraseña
                    </Text>
                    <CustomInputs variant="password" control={control} name="newPassword">
                      Contraseña
                    </CustomInputs>
                    <CustomInputs variant="password" control={control} name="confirmNewPassword">
                      Repite Contraseña
                    </CustomInputs>
                </View>
                <View className="flex flex-row justify-around mt-20">
                    <Link href={"/Sign-in"} asChild>
                        <CustomButton
                            width={130}
                            height={47}
                            variant="secondary"
                        >
                            Cancelar
                        </CustomButton>
                    </Link>
                    <CustomButton
                        width={130}
                        height={47}
                        variant="primary"
                        onPress={
                            handleSubmit((data) => {
                                if (data){
                                    router.push("/Sign-in")
                                }
                            })
                        }
                    >
                        Actualizar
                    </CustomButton>
                </View>
            </Screen>
        </ScrollView>
    )
}
