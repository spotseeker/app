/* eslint-disable @typescript-eslint/no-require-imports */
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { useFonts } from 'expo-font'
import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf')
  })
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }

    const onBackPress = () => {
      const currentSegment = segments[0]

      if (currentSegment === '(tabs)') {
        return true
      }

      if (router.canGoBack()) {
        router.back()
        return true
      }

      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => backHandler.remove()
  }, [fontsLoaded, error, segments, router])

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(aux)" />
    </Stack>
  )
}
