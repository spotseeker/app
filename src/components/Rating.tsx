import React from 'react'
import { Pressable, View } from 'react-native'
import Icons from './Icons'

type RatingProps = {
  rating: number
  setRating: (rate: number) => void
}

function Rating({ rating, setRating }: RatingProps) {
  const { StarIcon } = Icons

  return (
    <View className="flex flex-row justify-items-start">
      <Pressable onPress={() => setRating(1)}>
        <StarIcon shown={rating >= 1} />
      </Pressable>
      <Pressable onPress={() => setRating(2)}>
        <StarIcon shown={rating >= 2} />
      </Pressable>
      <Pressable onPress={() => setRating(3)}>
        <StarIcon shown={rating >= 3} />
      </Pressable>
      <Pressable onPress={() => setRating(4)}>
        <StarIcon shown={rating >= 4} />
      </Pressable>
      <Pressable onPress={() => setRating(5)}>
        <StarIcon shown={rating >= 5} />
      </Pressable>
    </View>
  )
}

export default Rating
