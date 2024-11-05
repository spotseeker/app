import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreatePosts from '@/src/screens/CreatePosts'
function NewPost() {
  const { ArrowBack, CrossDeleteIcon, RefreshIcon } = Icons
  const [step, setStep] = useState(1)
  const navigation = useNavigation()
  const [image, setImage] = useState<string[]>([])

  const headerTitleStep = () => {
    switch (step) {
      case 1:
        return 'Crear publicación nueva'
      case 2:
        return 'Seleccionar imagen'
      case 3:
        return 'Añadir ubicación'
      case 4:
        return 'Añadir etiquetas'
      default:
        return 'Crear publicación nueva'
    }
  }

  const headerRightSideStep = () => {
    switch (step) {
      case 1:
        return ''
      case 2:
        return (
          <Pressable onPress={() => setImage([])}>
            <CrossDeleteIcon color="#ee5d6c" />
          </Pressable>
        )
      case 3:
        return <RefreshIcon />
      case 4:
        return ''
      default:
        return ''
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      gestureEnabled: false,
      title: '',
      headerTitle: headerTitleStep(),
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRight: () => (
        <Pressable onPress={() => ''}>{headerRightSideStep()}</Pressable>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={step !== 1 ? () => setStep(1) : () => router.push('/(tabs)/home')}
        >
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation, step])
  return (
    <SafeAreaView edges={['bottom']} className="w-full h-full bg-white flex-1">
      <CreatePosts
        step={step}
        setStep={setStep}
        image={image as string[]}
        setImage={setImage}
      />
    </SafeAreaView>
  )
}

export default NewPost
