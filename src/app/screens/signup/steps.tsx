import Input from '@/src/components/Input'
import DatePicker from '@/src/components/DatePicker'
import Icons from '@/src/components/Icons'
import React, { useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { View, Text, Pressable, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { avatar } from '@/src/types/user'

type StepsProps = {
  control: Control
  setAvatar?: (data: avatar | null) => void
}

type Step3Props = {
  control: Control
  setAvatar: (data: avatar | null) => void
}

const Step1 = ({ control }: StepsProps) => {
  return (
    <View className="flex justify-center my-[70px] items-center">
      <Input
        text="Introduce tu correo"
        placeholder="correo"
        variant="email"
        control={control}
        name="email"
      />
      <Input
        text="Introduce tu nombre de usuario"
        placeholder="usuario"
        variant="email"
        control={control}
        name="username"
      />
      <Text className="font-psemibold text-helper text-center text-[10px]">
        El nombre de usuario es unico, lo puedes cambiar en cualquier momento
      </Text>
    </View>
  )
}

const Step2 = ({ control }: StepsProps) => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [dateError, setDateError] = useState('Seleccionar fecha por favor')

  return (
    <View className="flex justify-center my-[50px] items-center">
      <Input
        text="Introduce tu nombre"
        placeholder="nombre"
        variant="default"
        control={control}
        name="firstname"
      />
      <Input
        text="Introduce tu apellido"
        placeholder="apellido"
        variant="default"
        control={control}
        name="lastname"
      />
      <Pressable onPress={() => setShow(true)}>
        <Input
          text="Introduce tu fecha de nacimiento"
          placeholder="fecha de nacimiento"
          variant="date"
          control={control}
          name="birthdateString"
          date={date}
        />
      </Pressable>

      {show && (
        <DatePicker
          show={show}
          setDate={setDate}
          control={control}
          name="birthdate"
          setShow={setShow}
          setDateError={setDateError}
        />
      )}
      {dateError ? <Text>{dateError}</Text> : null}
    </View>
  )
}

const Step3 = ({ control, setAvatar }: Step3Props) => {
  const { ImageIcon2, CrossDeleteIcon } = Icons
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        alert('Lo sentimos, necesitamos permisos para acceder a tu cámara!')
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    })

    console.log(result)

    if (!result.canceled) {
      const updateAvatar: avatar = {
        uri: result.assets[0].uri,
        fileName: result.assets[0].fileName as string,
        mimeType: result.assets[0].mimeType as string
      }
      setAvatar(updateAvatar as avatar)
      setImage(result.assets[0].uri)
    }
  }

  const removeImage = () => {
    setImage(null)
    setAvatar(null)
  }
  return (
    <>
      <View className="flex content-start items-start mt-10">
        <Text className="font-psemibold text-helper text-left text-[16px]">
          Escoge una foto de perfil
        </Text>
      </View>

      <View className="flex justify-center my-[50px] items-center">
        {image ? (
          <View className="flex flex-row justify-center items-center">
            <Pressable onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </Pressable>

            <Pressable
              onPress={removeImage}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: 50
              }}
            >
              <CrossDeleteIcon size={25} color="#ee5d6c" />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={pickImage}>
            <ImageIcon2 />
          </Pressable>
        )}

        <Input
          text="Cuéntanos acerca de ti"
          variant="description"
          name="aboutme"
          control={control}
        />
      </View>
    </>
  )
}

const Step4 = ({ control }: StepsProps) => {
  return (
    <View className="flex justify-center my-[50px] items-center">
      <Input
        text="Introduce tu contraseña"
        placeholder="contraseña"
        variant="password"
        control={control}
        name="password"
      />
      <Input
        text="Confirma tu contraseña"
        placeholder="contraseña"
        variant="password"
        control={control}
        name="confirm"
      />
    </View>
  )
}

const Step5 = ({ control }: StepsProps) => {
  return (
    <View className="flex justify-center my-[50px] items-center">
      <Text className="font-psemibold text-lightc text-center text-[18px] mb-5">
        Hemos enviado el codigo a tu correo por favor verificalo
      </Text>
      <Input
        text="Introduce el código"
        placeholder="código"
        variant="number"
        control={control}
        name="code"
      />
    </View>
  )
}

export default { Step1, Step2, Step3, Step4, Step5 }
