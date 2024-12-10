import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Post } from '../types/post'

const style = StyleSheet.create({
  image: {
    width: 120,
    height: 120
  }
})

function ImageGrid({ item }: { item: Post }) {
  return <Image style={style.image} source={{ uri: item.images[0].media }} />
}

export default ImageGrid
