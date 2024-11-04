import { Stack } from 'expo-router'
import React from 'react'

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default ProfileLayout
