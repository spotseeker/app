import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import { router, useNavigation } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import Icons from '@/src/components/Icons'
import Screen from '@/src/components/Screen'
import { OTPSchema } from '@/src/schemas/userSchema'
import Input from '@/src/components/Input'
import Button from '@/src/components/Button'
import { useSendPasswordOTP } from '@/src/hooks/useAuth'

export default function ValidateOTP() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])
  const { HappyIcon } = Icons
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(OTPSchema)
  })

  const { validateOTPMutation } = useSendPasswordOTP()

  return (
    <ScrollView>
      <Screen>
        <View className="flex justify-center items-center">
          <Text className="text-helper font-pbold text-[20px] mb-5">
            Introduce el código
          </Text>
          <HappyIcon />
          <Text className="text-lightc font-pbold text-[16px] mt-5">
            Hemos enviado el código a tu correo
          </Text>
          <Text className="text-lightc font-pbold text-[16px]">por favor verificalo</Text>
          <Input
            text="Código"
            placeholder="código"
            variant="number"
            control={control}
            name="otp"
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
              if (data) {
                validateOTPMutation(data.otp)
                reset()
                router.push('/auth/password/reset')
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
