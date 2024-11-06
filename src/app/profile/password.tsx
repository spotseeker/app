import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Screen from '@/src/components/Screen'
import { UpdatePasswordSchema } from '@/src/schemas/UserSchema'
import Input from '@/src/components/Input'
import Button from '@/src/components/Button'
import { Avatar } from '@kolking/react-native-avatar'
import { Colors } from '@/src/constants/Colors'
import ProfileImg from '@/src/assets/images_app/avatar_users/image_profile.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModalAction from '@/src/components/ModalAction'
import { router, useNavigation } from 'expo-router'
import Icons from '@/src/components/Icons'

export default function UpdatePassword() {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitle: 'Cambio de  Contraseña',
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
    resolver: zodResolver(UpdatePasswordSchema),
    mode: 'onChange'
  })

  const [isConfirmationVisible, setConfirmationVisible] = useState(false)
  const [isSuccessVisible, setSuccessVisible] = useState(false)
  const [isErrorVisible, setErrorVisible] = useState(false)

  const handleUpdatePassword = () => {
    reset()
    setSuccessVisible(true)
  }

  const handleError = () => {
    setErrorVisible(true)
  }

  const onSubmit = () => {
    setConfirmationVisible(true)
  }

  return (
    <SafeAreaView className=" w-full bg-white">
      <ScrollView className="mt-[-10%]">
        <Screen>
          <View className="flex justify-center items-center mt-[5%]">
            <View className="mt-[-20%]">
              <Avatar source={ProfileImg} color={Colors.text} radius={100} size={100} />
            </View>
            <View className="mt-[30px] px-[10%]">
              <Input
                text=" Ingresa Tu Clave Actual"
                variant="password"
                control={control}
                name="currentPassword"
                placeholder="contraseña"
              />
              <Input
                text="Ingresa Tu Nueva Clave"
                variant="password"
                control={control}
                name="newPassword"
                placeholder="contraseña"
              />
              <Input
                text=" Confirma Tu Nueva Clave"
                variant="password"
                control={control}
                name="confirmNewPassword"
                placeholder=" confirma contraseña"
              ></Input>
            </View>
          </View>
          <View className="flex justify-around ml-[55%] pb-[10] mt-[20%]">
            <Button
              width={150}
              height={47}
              variant="primary"
              onPress={handleSubmit(onSubmit, handleError)}
            >
              Cambiar Contraseña
            </Button>
          </View>
        </Screen>
      </ScrollView>

      {/* Modal de confirmación */}
      <ModalAction
        visible={isConfirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleSubmit(() => {
          handleUpdatePassword()
          setConfirmationVisible(false)
        }, handleError)}
        action="confirmation"
        message="La proxima vez que ingreses usaras esta clave ¿Estás seguro de realizar este cambio?"
      />

      {/* Modal de éxito */}
      <ModalAction
        action="success"
        message="Contraseña Actualizada con exito"
        visible={isSuccessVisible}
        onClose={() => {
          setSuccessVisible(false)
        }}
      />

      {/* Modal de error */}
      <ModalAction
        action="error"
        message="Hubo un error al actualizar la clave. Por favor, verifica los campos."
        visible={isErrorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </SafeAreaView>
  )
}
