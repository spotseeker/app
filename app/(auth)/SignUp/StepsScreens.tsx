import CustomInputs from "@/components/CustomInputs";
import DatePicker from "@/components/DatePicker";
import Icons from "@/components/Icons";
import React, { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { View, Text, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
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
      <CustomInputs variant="default" control={control} name="firstname">
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
  const { ImageIcon2, EditIcon, TrashIcon } = Icons;
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Lo sentimos, necesitamos permisos para acceder a tu cámara!");
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null); // Elimina la imagen
  };
  return (
    <>
      <View className="flex content-start items-start mt-10">
        <Text className="font-psemibold text-helper text-left text-[16px]">
          Escoge una foto de perfil
        </Text>
      </View>

      <View className="flex justify-center my-5 items-center">
        {image ? (
          <View className="flex flex-row justify-center items-center">
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <View className="flex flex-column justify-center items-center ">
              <Pressable onPress={pickImage}>
                <EditIcon color="#ee5d6c" size={30} />
              </Pressable>
              <Pressable onPress={removeImage}>
                <TrashIcon size={30} />
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={pickImage}>
            <ImageIcon2 />
          </Pressable>
        )}

        <CustomInputs variant="description" name="aboutme" control={control}>
          Cuéntanos acerca de ti
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
