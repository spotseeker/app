import React from "react";
import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icons from "@/components/Icons";
import Screen from "@/components/Screen";
import { EmailSchema } from "@/Schemas/UserSchema";
import CustomInputs from "@/components/CustomInputs";
import CustomButton from "@/components/CustomButton";

export default function RecoveryFunction(){
    const { EmailIcon } = Icons
    const { control } = useForm({
        resolver: zodResolver(EmailSchema),
      });

    return (
        <Screen>
            <View className="flex justify-center items-center">
                <Text className="text-helper font-pbold text-[20px]">
                    Introduce tu dirección de
                </Text>
                <Text className="text-helper font-pbold text-[20px] mb-5">
                    correo electrónico
                </Text>
                <EmailIcon/>
                <Text className="text-lightc font-pbold text-[16px] mt-5">
                    Para recuperar tu contraseña
                </Text>
                <Text className="text-lightc font-pbold text-[16px]">
                    necesitarás el correo electrónico
                </Text>
                <Text className="text-lightc font-pbold text-[16px]">
                    vinculado a tu cuenta
                </Text>
                <CustomInputs variant="email" control={control} name="email">
                  Correo vinculado
                </CustomInputs>
            </View>
            <View className="flex flex-row justify-around mt-20">
                <CustomButton
                    width={130}
                    height={47}
                    variant="secondary"
                >
                    Cancelar
                </CustomButton>
                <CustomButton
                    width={130}
                    height={47}
                    variant="primary"
                >
                    Siguiente
                </CustomButton>
            </View>
        </Screen>
    )
}
