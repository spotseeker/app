import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { router } from 'expo-router'
import Icons from '@/src/components/Icons'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import { LoginSchema } from '@/src/schemas/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Screen from '@/src/components/Screen'
import { Link } from 'expo-router'

export default function Login() {
  const { LogoIcon } = Icons
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(LoginSchema)
  })
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
          <Button
            width={330}
            height={47}
            variant="primary"
            onPress={handleSubmit(() => {
              reset()
              router.push('/(tabs)/home')
            })}
          >
            Ingresar
          </Button>
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
