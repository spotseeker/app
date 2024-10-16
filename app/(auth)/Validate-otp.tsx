import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import Icons from "@/components/Icons";
import Screen from "@/components/Screen";
import { OTPSchema } from "@/Schemas/UserSchema";
import CustomInputs from "@/components/CustomInputs";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

export default function RecoveryFunction(){
    const { HappyIcon } = Icons
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(OTPSchema),
      });

    return (
        <ScrollView>
            <Screen>
                <View className="flex justify-center items-center">
                    <Text className="text-helper font-pbold text-[20px] mb-5">
                        Introduce el código
                    </Text>
                    <HappyIcon/>
                    <Text className="text-lightc font-pbold text-[16px] mt-5">
                        Hemos enviado el código a tu correo
                    </Text>
                    <Text className="text-lightc font-pbold text-[16px]">
                        por favor verificalo
                    </Text>
                    <CustomInputs variant="default" control={control} name="otp">
                      Código
                    </CustomInputs>
                </View>
                <View className="flex flex-row justify-around mt-20">
                    <Link href={"/Recovery-password"} asChild>
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
                                    router.push("/Reset-password")
                                }
                            })
                        }
                    >
                        Siguiente
                    </CustomButton>
                </View>
            </Screen>
        </ScrollView>
    )
}
