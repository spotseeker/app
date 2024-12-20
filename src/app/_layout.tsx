/* eslint-disable @typescript-eslint/no-require-imports */
import { router, SplashScreen, Stack, usePathname } from 'expo-router'
import { useFonts } from 'expo-font'
import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from '../context/context'
const client = new QueryClient()

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

      if (pathname.startsWith('/auth')) {
        return true
      }

      if (pathname === '/auth/login' || pathname === '/welcome') {
        return true
      }

      if (pathname === '/profile/notifications') {
        router.replace('/home')
        return true
      }

      if (pathname.startsWith('/profile') && pathname !== '/profile/notifications') {
        router.replace('/profile')
        return true
      }

      if (pathname == '/profile/edit' || pathname === '/profile/password') {
        return true
      }
      const postPattern = /^\/post\/[a-zA-Z0-9_-]+\/comments$/
      if (postPattern.test(pathname)) {
        router.back()
        return true
      }
      const postSolo = /^\/post\/[a-zA-Z0-9_-]+\/solo$/

      if (postSolo.test(pathname)) {
        router.back()
        return true
      }

      // eslint-disable-next-line no-useless-escape
      const searchRoute = /^\/post\/[a-f0-9\-]{36}\}\/edit$/
      if (searchRoute.test(pathname)) {
        router.back()
        return true
      }

      if (pathname == '/search') {
        router.back()
        return true
      }

      if (pathname.endsWith('wers') || pathname.endsWith('ing')) {
        router.back()
        return true
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
    <SessionProvider>
      <QueryClientProvider client={client}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(aux)" />
        </Stack>
      </QueryClientProvider>
    </SessionProvider>
  )
}
