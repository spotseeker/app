import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Screen from '@/src/components/Screen'
import { EditProfileSchema } from '@/src/schemas/userSchema'
import Input from '@/src/components/Input'
import Button from '@/src/components/Button'
import { Avatar } from '@kolking/react-native-avatar'
import { Colors } from '@/src/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModalAction from '@/src/components/ModalAction'
import * as ImagePicker from 'expo-image-picker'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import { useGetUserData, useUpdateUserData } from '@/src/hooks/useUserData'
import { UpdateUser, UserResponse, avatarUploaded } from '@/src/types/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { upload } from 'cloudinary-react-native'
import { cld } from '@/src/hooks/cloudinary'

export default function EditProfile() {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitle: 'Editar',
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('/profile/settings')}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(EditProfileSchema),
    mode: 'onChange'
  })

  const { EditIcon } = Icons
  const [isConfirmationVisible, setConfirmationVisible] = useState(false)
  const [isSuccessVisible, setSuccessVisible] = useState(false)
  const [isErrorVisible, setErrorVisible] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [formerUserData, setFormerUserData] = useState<UserResponse>()
  const [userName, setUserName] = useState<string | undefined>()
  const [userFormBody, setUserFormBody] = useState<UpdateUser>()
  const [avatarUploaded, setAvatarUploaded] = useState<avatarUploaded | null>(null)

  useEffect(() => {
    const response = async () => {
      const data = await AsyncStorage.getItem('usernameStorage')
      if (data!) {
        setUserName(data)
      }
    }
    response()
  }, [userName])

  const { getUserData } = useGetUserData(userName as string)

  useEffect(() => {
    if (getUserData) {
      setFormerUserData(getUserData)
    }
  }, [getUserData])

  useEffect(() => {
    if (formerUserData) {
      setImage(formerUserData.avatar)
    }
  }, [formerUserData])

  useEffect(() => {
    reset({
      username: getUserData?.username as string,
      firstname: getUserData?.firstName as string,
      lastname: getUserData?.lastName as string,
      aboutme: getUserData?.description as string
    })
  }, [formerUserData])

  const handleError = () => {
    setErrorVisible(true)
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      let updatedAvatar = formerUserData?.avatar // Inicializamos con el avatar anterior

      // Si la imagen cambió, subimos la nueva imagen
      if (image && image !== formerUserData?.avatar) {
        console.log('Subiendo nueva imagen...', image)
        await uploadImage(image) // Espera la carga de la imagen antes de continuar

        if (avatarUploaded) {
          updatedAvatar = avatarUploaded.url // Si la subida fue exitosa, obtenemos la URL actualizada
        } else {
          console.error('Error al subir la imagen')
          return // Salimos si la imagen no se subió correctamente
        }
      }

      // Actualizamos el cuerpo del formulario con los datos del usuario
      setUserFormBody({
        username: data.username,
        firstName: data.firstname,
        lastName: data.lastname,
        description: data.aboutme,
        avatar: updatedAvatar || (formerUserData?.avatar as string) // Si no hay imagen, mantenemos la anterior
      })

      setConfirmationVisible(true) // Mostramos la confirmación
    } catch (err) {
      console.log('Error al procesar la actualización del perfil:', err)
      setErrorVisible(true) // Mostramos error si algo sale mal
    }
  }

  const { useUpdate, isError, isPending } = useUpdateUserData(userFormBody as UpdateUser)

  const handleEditProfile = async () => {
    setConfirmationVisible(false)

    const response = async () => {
      try {
        await useUpdate()
        console.log('userData actualizada exitosamente')
      } catch (error) {
        console.error('Error al actualizar userData:', error)
      }
    }

    if (userFormBody) {
      response()
    }
    console.log(userFormBody)

    if (!isPending) {
      if (isError == true) {
        setSuccessVisible(false)
        setErrorVisible(true)
      } else {
        setSuccessVisible(true)
        setErrorVisible(false)
      }
    }
    reset()
    setConfirmationVisible(false)
  }

  const uploadImage = async (
    selectedImage: string
  ): Promise<avatarUploaded | undefined> => {
    if (!selectedImage) {
      console.log('No se seleccionó una imagen.')
      return undefined
    }

    const options = {
      upload_preset: 'spotseeker',
      unsigned: true
    }

    try {
      console.log('Iniciando subida de imagen...')
      const response = await new Promise<avatarUploaded>((resolve, reject) => {
        upload(cld, {
          file: selectedImage,
          options: options,
          callback: (error, response) => {
            if (error || !response) {
              console.error('Error en la subida de la imagen:', error)
              reject(error)
            } else {
              console.log('Imagen subida con éxito:', response)
              resolve({
                publicID: response?.public_id,
                url: response?.secure_url
              })
            }
          }
        })
      })
      console.log('Imagen subida con éxito', response.url)
      setAvatarUploaded({ publicID: response.publicID, url: response.url })
      return response
    } catch (error) {
      console.error('Error al subir la imagen', error)
      throw error
    }
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        alert('Lo sentimos, necesitamos permisos para acceder a tu cámara!')
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <ScrollView className="">
        <Screen>
          <View className="flex justify-center items-center mt-[-30%]">
            <View className="mt-[10%]">
              <TouchableOpacity onPress={pickImage}>
                <Avatar
                  source={{ uri: image as string }}
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
              <Input
                variant="default"
                control={control}
                name="username"
                text="Nombre de Usuario"
                placeholder="usuario actual"
              ></Input>
              <Input
                variant="default"
                control={control}
                name="firstname"
                text="Nombre"
                placeholder="Nombre"
              ></Input>
              <Input
                variant="default"
                control={control}
                name="lastname"
                text="Apellido"
                placeholder="Apellido"
              ></Input>
              <Input
                variant="description"
                control={control}
                name="aboutme"
                text="Descripción"
                placeholder="Descripcion"
              ></Input>
            </View>
          </View>
          <View className="flex justify-around ml-[60%] pb-[10]">
            <Button
              width={130}
              height={47}
              variant="primary"
              onPress={handleSubmit(onSubmit, handleError)}
            >
              Actualizar
            </Button>
          </View>
        </Screen>
      </ScrollView>

      <ModalAction
        visible={isConfirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleSubmit(async (data) => {
          onSubmit(data)
          handleEditProfile()
          setConfirmationVisible(false)
        }, handleError)}
        action="confirmation"
        message="La próxima vez que ingreses se aplicarán estos cambios. ¿Estás seguro de continuar?"
      />

      <ModalAction
        action="success"
        message="Datos de perfil actualizados con éxito"
        visible={isSuccessVisible}
        onClose={() => {
          setSuccessVisible(false)
        }}
      />

      <ModalAction
        action="error"
        message="Hubo un error al actualizar la información. Por favor, verifica los campos."
        visible={isErrorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  badgeContainer: {
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: -10,
    right: -8,
    backgroundColor: '#D1D1D6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
