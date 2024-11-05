import { useEffect } from 'react'

import { router } from 'expo-router'
export default function CreatePost() {
  useEffect(() => {
    router.push('/posting/NewPost')
  }, [])
}
