import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import { router, useNavigation } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import Icons from '@/src/components/Icons'
import Screen from '@/src/components/Screen'
import { EmailSchema } from '@/src/schemas/userSchema'
import Input from '@/src/components/Input'
import Button from '@/src/components/Button'
import { useRecoverPassword } from '@/src/hooks/useAuth'

export default function RecoveryPassword() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])
  const { EmailIcon } = Icons
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(EmailSchema)
  })

  const { sendOtpMutation } = useRecoverPassword()

  return (
    <ScrollView>
      <Screen>
        <View className="flex justify-center items-center">
          <Text className="text-helper font-pbold text-[20px]">
            Introduce tu dirección de
          </Text>
          <Text className="text-helper font-pbold text-[20px] mb-5">
            correo electrónico
          </Text>
          <EmailIcon />
          <Text className="text-lightc font-pbold text-[16px] mt-5">
            Para recuperar tu contraseña
          </Text>
          <Text className="text-lightc font-pbold text-[16px]">
            necesitarás el correo electrónico
          </Text>
          <Text className="text-lightc font-pbold text-[16px]">
            vinculado a tu cuenta
          </Text>
          <Input
            text="Correo vinculado"
            placeholder="correo"
            variant="email"
            control={control}
            name="email"
          />
        </View>
        <View className="flex flex-row justify-around mt-20">
          <Button
            width={130}
            height={47}
            variant="secondary"
            onPress={() => {
              reset()
              router.back()
            }}
          >
            Cancelar
          </Button>
          <Button
            width={130}
            height={47}
            variant="primary"
            onPress={handleSubmit((data) => {
              console.log('Form data:', data)
              if (data) {
                sendOtpMutation(data.email)
                reset()
                router.push('/auth/password/otp')
              }
            })}
          >
            Siguiente
          </Button>
        </View>
      </Screen>
    </ScrollView>
  )
}
