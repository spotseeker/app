import React, { useEffect } from 'react'
import Steps from './steps'
import { BackHandler, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { router } from 'expo-router'

type Props = {
  step: number
  setStep: (step: number) => void
  image: string[]
  setImage: (uris: string[]) => void
  location: string
  setLocation: (id: string) => void
  hashtags: string[]
  setHashtags: (hashtags: string[]) => void
}

export default function CreatePosts({
  step,
  setStep,
  image,
  setImage,
  setLocation,
  hashtags,
  setHashtags
}: Props) {
  const { control } = useForm({})
  const {
    CreatePostScreen1,
    SelectImageScreen,
    SelectLocationScreen,
    SelectHashtagsScreen
  } = Steps

  useEffect(() => {
    const backAction = () => {
      if (step === 1) {
        router.push('/(tabs)/home')
      }
      if (step != 1) {
        setStep(1)
        return true
      }

      return false
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => subscription.remove()
  }, [step])
  return (
    <View className="flex flex-1 my-6">
      {step == 1 && (
        <CreatePostScreen1 image={image} control={control} setStep={setStep} />
      )}
      {step == 2 && <SelectImageScreen image={image} setImage={setImage} />}
      {step == 3 && <SelectLocationScreen setLocation={setLocation} setStep={setStep} />}
      {step == 4 && (
        <SelectHashtagsScreen hashtags={hashtags} setHashtags={setHashtags} />
      )}
    </View>
  )
}
