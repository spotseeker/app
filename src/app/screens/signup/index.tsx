import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, BackHandler } from 'react-native'
import Button from '@/src/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Screen from '@/src/components/Screen'
import { loginData, RegisterSchema, UserData } from '@/src/schemas/userSchema'
import Icons from '@/src/components/Icons'
import Steps from './steps'
import { useRouter } from 'expo-router'
import { z } from 'zod'
import { avatar, avatarUploaded, RegisterUserType } from '@/src/types/user'
import { upload } from 'cloudinary-react-native'
import { cld } from '@/src/hooks/cloudinary'
import { useCreateUser, useLogin, useSendOtp } from '@/src/hooks/useUserData'

type registerProps = {
  step: number
  setStep: (step: number) => void
  userData: UserData
  setUserData: (user: UserData) => void
}

export default function SignupScreen({
  step,
  setStep,
  setUserData,
  userData
}: registerProps) {
  const [avatar, setAvatar] = useState<avatar | null>(null)
  const [avatarUploaded, setAvatarUploaded] = useState<avatarUploaded | null>(null)
  const [createUserData, setCreateUserData] = useState<RegisterUserType | null>(null)

  const { sendOtpMutation } = useSendOtp()
  const { loginMutation } = useLogin()

  // Hacemos un casting de los datos para que coincidan con el tipo loginData
  const onRegister = async (data: loginData) => {
    console.log(data)
    // Llamamos a loginMutation
    await loginMutation(data)
  }

  const getSchemaForStep = (step: number) => {
    switch (step) {
      case 1:
        return RegisterSchema.pick({ email: true, username: true })
      case 2:
        return RegisterSchema.pick({
          firstname: true,
          lastname: true,
          birthdate: true
        })
      case 3:
        return RegisterSchema.pick({ aboutme: true })
      case 4:
        return RegisterSchema.pick({ password: true, confirm: true }).refine(
          (data) => data.password === data.confirm,
          {
            message: 'Contraseñas no coinciden',
            path: ['confirm']
          }
        )
      case 5:
        return RegisterSchema.pick({ code: true })
      default:
        return z.object({})
    }
  }

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(getSchemaForStep(step)),
    mode: 'onChange'
  })

  const { Step1, Step2, Step3, Step4, Step5 } = Steps
  const { ShyIcon } = Icons
  const router = useRouter()

  const handleOnPress = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    if (step == 0) {
      reset()
      router.push('/auth/login')
      setStep(step + 1)
    }

    if (step > 5) {
      reset()
      setStep(1)
      router.push('/welcome')
    }

    if (step == 5) {
      const createUserPayload: RegisterUserType = {
        username: userData.username, // Cambié userName a username
        email: userData.email,
        first_name: userData.firstname, // Cambié firstName a first_name
        last_name: userData.lastname, // Cambié lastName a last_name
        birth_date: userData.birthdate
          ? userData.birthdate.toISOString().split('T')[0]
          : '', // Convertimos la fecha a string "YYYY-MM-DD"
        description: userData.aboutme,
        avatar: avatarUploaded?.url || '', // Usamos la URL del avatar cargado
        password: userData.password
      }

      setCreateUserData(createUserPayload) // Almacenamos los datos de creación del usuario
      console.log(createUserData)
      registerMutation(createUserPayload) // Realizamos la mutación para registrar al usuario
      onRegister({ username: userData.username, password: userData.password })
    }
  }, [step])

  useEffect(() => {
    const backAction = () => {
      if (step > 1) {
        setStep(step - 1)
        return true
      }
      return false
    }
    if (step == 4) {
      uploadImage()
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => subscription.remove()
  }, [step])

  const uploadImage = async (): Promise<avatarUploaded | undefined> => {
    if (!avatar) {
      return undefined
    }

    const options = {
      upload_preset: 'spotseeker',
      unsigned: true
    }

    try {
      const response = await new Promise<avatarUploaded>((resolve, reject) => {
        upload(cld, {
          file: avatar.uri,
          options: options,
          callback: (error, response) => {
            if (error || !response) {
              reject(error)
            } else {
              resolve({
                publicID: response?.public_id,
                url: response?.secure_url
              })
            }
          }
        })
      })
      console.log('Imagen subida con éxito', response.url)
      setAvatarUploaded({ publicID: response.publicID, url: response.url })
      return response
    } catch (error) {
      console.error('Error al subir la imagen', error)
      throw error
    }
  }
  const { registerMutation } = useCreateUser()
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <Screen>
          <View className="flex justify-center items-center ">
            <Text
              className={`text-helper font-pbold text-[30px] ${
                step == 1 ? 'text-center' : 'text-justify'
              }`}
            >
              {step == 1 && '¿Cómo te identificamos?'}
              {step == 2 && '¿Cómo te llamas?'}
              {step == 3 && 'Prepara tu perfil'}
              {step == 5 && 'Confirma tu correo'}
            </Text>
            {step == 4 && <ShyIcon />}
          </View>
          {step === 1 && <Step1 control={control} />}
          {step === 2 && <Step2 control={control} />}
          {step === 3 && <Step3 control={control} setAvatar={setAvatar} />}
          {step === 4 && <Step4 control={control} />}
          {step === 5 && <Step5 control={control} />}
          {step >= 1 && step <= 5 && (
            <View className="flex flex-row space-x-[-20px] justify-between items-center ">
              <Button width={130} height={47} variant="secondary" onPress={handleOnPress}>
                Volver
              </Button>
              <Button
                width={130}
                height={47}
                variant="primary"
                onPress={handleSubmit((data) => {
                  const updatedUserData: UserData = {
                    ...userData,
                    ...(step === 1 ? { email: data.email, username: data.username } : {}),
                    ...(step === 2
                      ? {
                          firstname: data.firstname,
                          lastname: data.lastname,
                          birthdate: data.birthdate
                        }
                      : {}),
                    ...(step === 3 ? { aboutme: data.aboutme } : {}),
                    ...(step === 4
                      ? { password: data.password, confirm: data.confirm }
                      : {}),
                    ...(step === 5 ? { code: data.code } : {})
                  }

                  setUserData(updatedUserData)

                  if (step === 5) {
                    sendOtpMutation(userData.code)
                    setStep(step + 1)
                  } else {
                    setStep(step + 1)
                  }
                })}
              >
                Siguiente
              </Button>
            </View>
          )}
        </Screen>
      </ScrollView>
    </SafeAreaView>
  )
}
