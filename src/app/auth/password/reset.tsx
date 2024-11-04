import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import { router, useNavigation } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import Icons from '@/src/components/Icons'
import Screen from '@/src/components/Screen'
import { ResetPasswordSchema } from '@/src/schemas/UserSchema'
import Input from '@/src/components/Input'
import Button from '@/src/components/Button'

export default function ResetPassword() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])
  const { LockIcon } = Icons
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(ResetPasswordSchema)
  })

  return (
    <ScrollView>
      <Screen>
        <View className="flex justify-center items-center">
          <Text className="text-helper font-pbold text-[20px] mb-5">
            ¡Hora de cambiar la contraseña!
          </Text>
          <LockIcon />
          <Text className="text-lightc font-pbold text-[16px] mt-5">
            Introduce la nueva contraseña
          </Text>
          <Input
            text='Contraseña'
            placeholder='contraseña'
            variant="password"
            control={control}
            name="newPassword"
          />
          <Input
            text='Repite Contraseña'
            placeholder='contraseña'
            variant="password"
            control={control}
            name="confirmNewPassword"
          />
        </View>
        <View className="flex flex-row justify-around mt-20">
          <Button
            width={130}
            height={47}
            variant="secondary"
            onPress={() => {
              reset()
              router.replace('/auth/login')
            }}
          >
            Cancelar
          </Button>
          <Button
            width={130}
            height={47}
            variant="primary"
            onPress={handleSubmit((data) => {
              if (data) {
                reset()
                router.push('/(tabs)/home')
              }
            })}
          >
            Actualizar
          </Button>
        </View>
      </Screen>
    </ScrollView>
  )
}
