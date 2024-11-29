import { Stack } from 'expo-router'
import React from 'react'
import { SessionProvider } from '@/src/context/context'

const AuthLayout = () => {
  return (
    <>
      <SessionProvider>
        <Stack>
          <Stack.Screen
            name="login"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </SessionProvider>
    </>
  )
}

export default AuthLayout
