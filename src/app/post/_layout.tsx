import { Stack } from 'expo-router'
import React from 'react'

const PostingLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="NewPost"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EditPost"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default PostingLayout
