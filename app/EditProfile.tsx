import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Screen from "@/components/Screen";
import { EditProfileSchema } from "@/Schemas/UserSchema";
import CustomInputs from "@/components/CustomInputs";
import CustomButton from "@/components/CustomButton";
import { Avatar } from "@kolking/react-native-avatar";
import { Colors } from "@/constants/Colors";
import ProfileImg from "@/assets/images_app/avatar_users/image_profile.png";
import { SafeAreaView } from "react-native-safe-area-context";
import ModalAction from "@/components/ModalAction";
import * as ImagePicker from "expo-image-picker";
import Icons
 from "@/components/Icons";
export default function EditProfile() {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(EditProfileSchema),
    mode: "onChange",
  });

  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const {EditIcon} = Icons

  const handleEditProfile = () => {
    reset();
    setSuccessVisible(true);
  };

  const handleError = () => {
    setErrorVisible(true);
  };

  const onSubmit = () => {
    setConfirmationVisible(true);
  };

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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ScrollView className="mt-[-5%]">
        <Screen>
          <View className="flex justify-center items-center mt-[-30%]">
            <View className="mt-[10%]">
              <TouchableOpacity onPress={pickImage}>
                <Avatar
                  source={image ? { uri: image } : ProfileImg}
                  color={Colors.text}
                  radius={90}
                  size={90}
                />
                <View style={styles.badgeContainer}>
                 <EditIcon size={15} color="#FB9062"></EditIcon>
                </View>
              </TouchableOpacity>
            </View>
            <View className="mt-[30px] px-[10%]">
              <CustomInputs variant="default" control={control} name="username">
                Nombre de Usuario
              </CustomInputs>
              <CustomInputs variant="default" control={control} name="firstname">
                Nombre
              </CustomInputs>
              <CustomInputs variant="default" control={control} name="lastname">
                Apellido
              </CustomInputs>
              <CustomInputs variant="description" control={control} name="aboutme">
                Descripción
              </CustomInputs>
            </View>
          </View>
          <View className="flex justify-around ml-[60%] pb-[10]">
            <CustomButton
              width={130}
              height={47}
              variant="primary"
              onPress={handleSubmit(onSubmit, handleError)}
            >
              Actualizar
            </CustomButton>
          </View>
        </Screen>
      </ScrollView>

      <ModalAction
        visible={isConfirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleSubmit(() => {
          handleEditProfile();
          setConfirmationVisible(false);
        }, handleError)}
        action="confirmation"
        message="La próxima vez que ingreses se aplicarán estos cambios. ¿Estás seguro de continuar?"
      />

      <ModalAction
        action="success"
        message="Datos de perfil actualizados con éxito"
        visible={isSuccessVisible}
        onClose={() => {
          setSuccessVisible(false);
        }}
      />

      <ModalAction
        action="error"
        message="Hubo un error al actualizar la información. Por favor, verifica los campos."
        visible={isErrorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    width: 35,
    height: 35,
    position: "absolute",
    bottom: -10,
    right: -8,
    backgroundColor: "#D1D1D6",
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});