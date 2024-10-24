import { Stack } from 'expo-router'
import React from 'react'
const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="Sign-in"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Sign-up"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Recovery-password"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Validate-otp"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Reset-password"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default AuthLayout
