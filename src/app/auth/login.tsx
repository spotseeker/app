import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { router } from 'expo-router'
import Icons from '@/src/components/Icons'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import { LoginSchema } from '@/src/schemas/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Screen from '@/src/components/Screen'
import { Link } from 'expo-router'
import { useAuthContext } from '@/src/context/context'

export default function Login() {
  const { login, error, tokens } = useAuthContext()
  const { LogoIcon } = Icons

  const schema_2 = LoginSchema.pick({ username: true, password: true })

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema_2)
  })

  // Función para manejar el envío del formulario
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await login(data.username, data.password)

      if (tokens) {
        router.push('/(tabs)/home')
      }
    } catch (err) {
      console.error('Error durante el proceso de login', err)
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <Screen>
          {/* Encabezado */}
          <View className="flex justify-center items-center">
            <Text className="text-lightc font-pbold text-[14px]">
              ¡Hola de nuevo viajero!
            </Text>
            <LogoIcon width={200} height={200} mr={15} />
          </View>

          {/* Inputs de usuario y contraseña */}
          <View className="flex justify-center items-center">
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

          {/* Enlace para recuperar contraseña */}
          <View className="flex justify-end items-end p-5">
            <Link asChild href={'/auth/password'}>
              <Text className="font-psemibold text-helper underline pb-5">
                Recuperar mi clave
              </Text>
            </Link>
          </View>

          {/* Mensaje de error */}
          {error && <Text className="text-red-500 text-center">{error}</Text>}

          {/* Botón de ingreso */}
          <Button
            width={330}
            height={47}
            variant="primary"
            onPress={handleSubmit(onSubmit)} // Conectar con handleSubmit
          >
            Ingresar
          </Button>

          {/* Enlace para registro */}
          <View className="flex flex-row space-x-[-20px] justify-center items-center">
            <Text className="font-psemibold p-5">¿No posees cuenta?</Text>
            <Link asChild href={'/auth/signup'}>
              <Text className="font-psemibold text-helper underline p-5">
                Regístrate Aquí
              </Text>
            </Link>
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
  )
}
