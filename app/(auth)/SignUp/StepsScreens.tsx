import CustomInputs from "@/components/CustomInputs";
import DatePicker from "@/components/DatePicker";
import Icons from "@/components/Icons";
import React, { useState } from "react";
import { Control } from "react-hook-form";
import { View, Text, Pressable } from "react-native";
type StepsProps = {
  control: Control;
};
const Step1 = ({ control }: StepsProps) => {
  return (
    <View className="flex justify-center my-5 items-center">
      <CustomInputs variant="email" control={control} name="email">
        Introduce tu correo
      </CustomInputs>
      <CustomInputs variant="email" control={control} name="username">
        Introduce tu nombre de usuario
      </CustomInputs>
      <Text className="font-psemibold text-helper text-center text-[10px]">
        El nombre de usuario es unico, lo puedes cambiar en cualquier momento
      </Text>
    </View>
  );
};

const Step2 = ({ control }: StepsProps) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  return (
    <View className="flex justify-center my-5 items-center">
      <CustomInputs variant="default" control={control} name="namee">
        Introduce tu nombre
      </CustomInputs>
      <CustomInputs variant="default" control={control} name="lastname">
        Introduce tu apellido
      </CustomInputs>
      <Pressable onPress={() => setShow(true)}>
        <CustomInputs
          variant="date"
          control={control}
          name="birthdateString"
          date={date}
        >
          Introduce tu fecha de nacimiento
        </CustomInputs>
      </Pressable>

      {show && (
        <DatePicker
          setDate={setDate}
          control={control}
          name="birthdate"
          setShow={setShow}
        />
      )}
    </View>
  );
};

const Step3 = ({ control }: StepsProps) => {
  const { ImageIcon2 } = Icons;
  return (
    <>
      <View className="flex content-start items-start mt-10">
        <Text className="font-psemibold text-helper text-left text-[16px]">
          Escoge una foto de perfil
        </Text>
      </View>

      <View className="flex justify-center my-5 items-center">
        <Pressable>
          <ImageIcon2 size={60} />
        </Pressable>
        <CustomInputs variant="description" name="aboutme" control={control}>
          Cuentanos acerca de ti
        </CustomInputs>
      </View>
    </>
  );
};

const Step4 = ({ control }: StepsProps) => {
  return (
    <View className="flex justify-center my-5 items-center">
      <CustomInputs variant="password" control={control} name="password">
        Introduce tu contrasñea
      </CustomInputs>
      <CustomInputs variant="password" control={control} name="confirm">
        Confirma tu contraseña
      </CustomInputs>
    </View>
  );
};

const Step5 = ({ control }: StepsProps) => {
  return (
    <View className="flex justify-center my-10 items-center">
      <Text className="font-psemibold text-lightc text-center text-[18px] mb-5">
        Hemos enviado el codigo a tu correo por favor verificalo
      </Text>
      <CustomInputs variant="default" control={control} name="code">
        Introduce el codigo
      </CustomInputs>
    </View>
  );
};

export default { Step1, Step2, Step3, Step4, Step5 };
