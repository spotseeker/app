import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import { router } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import Icons from '@/src/components/Icons'
import Screen from '@/src/components/Screen'
import { EmailSchema } from '@/src/Schemas/UserSchema'
import CustomInputs from '@/src/components/CustomInputs'
import CustomButton from '@/src/components/CustomButton'

export default function RecoveryFunction() {
  const { EmailIcon } = Icons
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(EmailSchema)
  })

  return (
    <ScrollView>
      <Screen>
        <View className="flex justify-center items-center">
          <Text className="text-helper font-pbold text-[20px]">Introduce tu dirección de</Text>
          <Text className="text-helper font-pbold text-[20px] mb-5">correo electrónico</Text>
          <EmailIcon />
          <Text className="text-lightc font-pbold text-[16px] mt-5">
            Para recuperar tu contraseña
          </Text>
          <Text className="text-lightc font-pbold text-[16px]">
            necesitarás el correo electrónico
          </Text>
          <Text className="text-lightc font-pbold text-[16px]">vinculado a tu cuenta</Text>
          <CustomInputs variant="email" control={control} name="email">
            Correo vinculado
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
                router.push('/Validate-otp')
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
