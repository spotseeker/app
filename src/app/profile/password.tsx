import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Screen from '@/src/components/Screen'
import { UpdatePasswordSchema } from '@/src/schemas/userSchema'
import Input from '@/src/components/Input'
import Button from '@/src/components/Button'
import { Avatar } from '@kolking/react-native-avatar'
import { Colors } from '@/src/constants/Colors'
import ProfileImg from '@/src/assets/images_app/avatar_users/image_profile.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModalAction from '@/src/components/ModalAction'
import { router, useNavigation } from 'expo-router'
import Icons from '@/src/components/Icons'
import { useUpdatePassword } from '@/src/hooks/useUserData'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UpdatePassword() {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      gestureEnabled: false,
      title: '',
      headerTitle: 'Cambio de Contraseña',
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
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [userName, setUserName] = useState<string | undefined>()

  useEffect(() => {
    const response = async () => {
      const data = await AsyncStorage.getItem('usernameStorage')
      if (data!) {
        setUserName(data)
      }
    }

    response()
  }, [userName])

  const { UpdatePassword, isError, isPending } = useUpdatePassword(
    password,
    newPassword,
    userName as string
  )

  const handleUpdatePassword = () => {
    setConfirmationVisible(false)
    const response = async () => {
      try {
        await UpdatePassword()
        console.log('Contraseña actualizada exitosamente')
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error)
      }
    }

    if (password && newPassword) {
      response()
    }
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
  }

  const handleError = () => {
    setErrorVisible(true)
  }

  const onSubmit = (data: FieldValues) => {
    setPassword(data.currentPassword)
    setNewPassword(data.newPassword)
    setConfirmationVisible(true)
  }

  return (
    <SafeAreaView className="w-full bg-white">
      <ScrollView className="mt-[-10%]">
        <Screen>
          <View className="flex justify-center items-center mt-[5%]">
            <View className="mt-[-20%]">
              <Avatar source={ProfileImg} color={Colors.text} radius={100} size={100} />
            </View>
            <View className="mt-[30px] px-[10%]">
              <Input
                text="Ingresa Tu Clave Actual"
                variant="password"
                control={control}
                name="currentPassword" // Cambié el nombre a 'currentPassword'
                placeholder="Clave actual"
              />

              <Input
                text="Ingresa Tu Nueva Clave"
                variant="password"
                control={control}
                name="newPassword"
                placeholder="Nueva clave"
              />
              <Input
                text="Confirma Tu Nueva Clave"
                variant="password"
                control={control}
                name="confirmNewPassword"
                placeholder="Confirme la nueva clave"
              />
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
        onConfirm={handleSubmit((data) => {
          onSubmit(data)
          handleUpdatePassword()
        }, handleError)}
        action="confirmation"
        message="La próxima vez que ingreses usarás esta clave. ¿Estás seguro de realizar este cambio?"
      />

      {/* Modal de éxito */}
      <ModalAction
        action="success"
        message="Contraseña Actualizada con éxito"
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
