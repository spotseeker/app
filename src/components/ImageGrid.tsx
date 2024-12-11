import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { Post } from '../types/post'
import { router } from 'expo-router'

const style = StyleSheet.create({
  image: {
    width: 120,
    height: 120
  }
})

function ImageGrid({ item }: { item: Post }) {
  return (
    <Pressable onPress={() => router.push(`/post/${item.id}/solo`)}>
      <Image style={style.image} source={{ uri: item.images[0].media }} />
    </Pressable>
  )
}

export default ImageGrid
