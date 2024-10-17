import React, { useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Screen from "@/components/Screen";
import { RegisterSchema, UserData } from "@/Schemas/UserSchema";
import Icons from "@/components/Icons";
import StepsScreens from "./StepsScreens";
import { useRouter } from "expo-router";
import { z } from "zod";

type registerProps = {
  step: number;
  setStep: (step: number) => void;
  userData: UserData;
  setUserData: (user: UserData) => void;
};

export default function SignupScreens({
  step,
  setStep,
  setUserData,
  userData,
}: registerProps) {
  const getSchemaForStep = (step: number) => {
    switch (step) {
      case 1:
        return RegisterSchema.pick({ email: true, username: true });
      case 2:
        return RegisterSchema.pick({
          firstname: true,
          lastname: true,
          birthdate: true,
        });
      case 3:
        return RegisterSchema.pick({ aboutme: true });
      case 4:
        return RegisterSchema.pick({ password: true, confirm: true }).refine(
          (data) => data.password === data.confirm,
          {
            message: "Contraseñas no coinciden",
            path: ["confirm"], // path of error
          }
        );
      case 5:
        return RegisterSchema.pick({ code: true });
      default:
        return z.object({});
    }
  };
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(getSchemaForStep(step)),
    mode: "onChange",
  });

  const { Step1, Step2, Step3, Step4, Step5 } = StepsScreens;
  const { ShyIcon } = Icons;
  const router = useRouter();

  const handleOnPress = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (step == 0) {
      router.push("/Sign-in");
      setStep(step + 1);
    }

    if (step > 5) {
      router.push("/Sign-in");
      setStep(1);
    }
  }, [step]);
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <Screen>
          <View className="flex justify-center items-center ">
            <Text
              className={`text-helper font-pbold text-[30px] ${
                step == 1 ? "text-center" : "text-justify"
              }`}
            >
              {step == 1 && "¿Cómo te identificamos?"}
              {step == 2 && "¿Cómo te llamas?"}
              {step == 3 && "Prepara tu perfil"}
              {step == 5 && "Confirma tu correo"}
            </Text>
            {step == 4 && <ShyIcon />}
          </View>
          {step === 1 && <Step1 control={control} />}
          {step === 2 && <Step2 control={control} />}
          {step === 3 && <Step3 control={control} />}
          {step === 4 && <Step4 control={control} />}
          {step === 5 && <Step5 control={control} />}
          {step >= 1 && step <= 5 && (
            <View className="flex flex-row space-x-[-20px] justify-between items-center ">
              <CustomButton
                width={130}
                height={47}
                variant="secondary"
                onPress={handleOnPress}
              >
                Volver
              </CustomButton>
              <CustomButton
                width={130}
                height={47}
                variant="primary"
                onPress={handleSubmit((data) => {
                  const updatedUserData: UserData = {
                    ...userData,
                    ...(step === 1
                      ? { email: data.email, username: data.username }
                      : {}),
                    ...(step === 2
                      ? {
                          firstname: data.firstname,
                          lastname: data.lastname,
                          birthdate: data.birthdate,
                        }
                      : {}),
                    ...(step === 3 ? { aboutme: data.aboutme } : {}),
                    ...(step === 4
                      ? { password: data.password, confirm: data.confirm }
                      : {}),
                    ...(step === 5 ? { code: data.code } : {}),
                  };

                  setUserData(updatedUserData);
                  console.log(updatedUserData);
                  setStep(step + 1);
                })}
              >
                Siguiente
              </CustomButton>
            </View>
          )}
        </Screen>
      </ScrollView>
    </SafeAreaView>
  );
}
