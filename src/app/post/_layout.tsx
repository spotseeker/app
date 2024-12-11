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
          name="edit"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </>
  )
}

export default PostingLayout
