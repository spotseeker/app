import React from 'react'
import { Image, StyleSheet } from 'react-native'

type ImageGridProps = {
  url: string
}

const style = StyleSheet.create({
  image: {
    width: 120,
    height: 120
  }
})

function ImageGrid({ item }: { item: ImageGridProps }) {
  return <Image style={style.image} source={{ uri: item.url }} />
}

export default ImageGrid
