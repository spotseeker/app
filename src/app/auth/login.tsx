import React from 'react'
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native'
import { router } from 'expo-router'
import Icons from '@/src/components/Icons'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import { loginData, LoginSchema } from '@/src/schemas/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Screen from '@/src/components/Screen'
import { Link } from 'expo-router'
import { useLogin } from '@/src/hooks/useUserData'

export default function Login() {
  const { LogoIcon } = Icons
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(LoginSchema)
  })
  const { loginMutation } = useLogin()

  // Hacemos un casting de los datos para que coincidan con el tipo loginData
  const onSubmit = async (data: loginData) => {
    try {
      console.log(data)
      // Llamamos a loginMutation
      await loginMutation(data)

      // Si el login es exitoso, reseteamos los campos y navegamos a la pantalla principal
      reset()
      router.push('/(tabs)/home')
    } catch (err) {
      // Si ocurre un error, mostramos un mensaje
      console.error('Error en el login:', err)
      Alert.alert(
        'Error',
        `Hubo un problema al iniciar sesión, por favor intente nuevamente. `
      )
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <Screen>
          <View className="flex justify-center items-center">
            <Text className="text-lightc font-pbold text-[14px]">
              ¡Hola de nuevo viajero!
            </Text>
            <LogoIcon width={200} height={200} mr={15} />
          </View>
          <View className="flex justify-center items-center ">
            <Input
              text="Introduce usuario"
              placeholder="usuario"
              variant="email"
              control={control}
              name="username"
            />
            <Input
              text="Introduce contraseña"
              placeholder="contraseña"
              variant="password"
              control={control}
              name="password"
            />
          </View>
          <View className="flex justify-end items-end p-5">
            <Link asChild href={'/auth/password'}>
              <Text className="font-psemibold text-helper underline pb-5">
                Recuperar mi clave
              </Text>
            </Link>
          </View>
          <View className="flex justify-center items-center ">
            <Button
              width={340}
              height={47}
              variant="primary"
              onPress={handleSubmit((data) => {
                onSubmit({ username: data.username, password: data.password })
              })}
            >
              Ingresar
            </Button>
          </View>

          <View className="flex flex-row space-x-[-20px] justify-center items-center">
            <Text className="font-psemibold p-5">¿No posees cuenta?</Text>

            <Link asChild href={'/auth/signup'}>
              <Text className="font-psemibold text-helper underline p-5">
                Registrate Aqui
              </Text>
            </Link>
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
  )
}
