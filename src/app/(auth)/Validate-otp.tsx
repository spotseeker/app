import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import { router } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import Icons from '@/src/components/Icons'
import Screen from '@/src/components/Screen'
import { OTPSchema } from '@/src/Schemas/UserSchema'
import CustomInputs from '@/src/components/CustomInputs'
import CustomButton from '@/src/components/CustomButton'

export default function RecoveryFunction() {
  const { HappyIcon } = Icons
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(OTPSchema)
  })

  return (
    <ScrollView>
      <Screen>
        <View className="flex justify-center items-center">
          <Text className="text-helper font-pbold text-[20px] mb-5">Introduce el código</Text>
          <HappyIcon />
          <Text className="text-lightc font-pbold text-[16px] mt-5">
            Hemos enviado el código a tu correo
          </Text>
          <Text className="text-lightc font-pbold text-[16px]">por favor verificalo</Text>
          <CustomInputs variant="number" control={control} name="otp">
            Código
          </CustomInputs>
        </View>
        <View className="flex flex-row justify-around mt-20">
          <CustomButton
            width={130}
            height={47}
            variant="secondary"
            onPress={() => {
              reset()
              router.back()
            }}
          >
            Cancelar
          </CustomButton>
          <CustomButton
            width={130}
            height={47}
            variant="primary"
            onPress={handleSubmit((data) => {
              if (data) {
                reset()
                router.push('/Reset-password')
              }
            })}
          >
            Siguiente
          </CustomButton>
        </View>
      </Screen>
    </ScrollView>
  )
}
