/* eslint-disable @typescript-eslint/no-require-imports */
import { router, SplashScreen, Stack, usePathname } from 'expo-router'
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

  const pathname = usePathname()
  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }

    const onBackPress = () => {
      console.log('Current route:', pathname)

      if (pathname === '/profile/settings') {
        router.replace('/profile')
        return true
      }

      if (pathname == '/profile/edit' || pathname === '/profile/password') {
        return false
      }

      return false
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => backHandler.remove()
  }, [fontsLoaded, error, pathname])

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
