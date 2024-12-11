import { Stack } from 'expo-router'
import React from 'react'

const EditLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default EditLayout
