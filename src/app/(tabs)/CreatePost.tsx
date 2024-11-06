import { useEffect } from 'react'

import { Href, router } from 'expo-router'
export default function CreatePost() {
  useEffect(() => {
    router.push('/post/NewPost' as Href)
  }, [])
}
