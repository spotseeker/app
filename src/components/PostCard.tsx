import * as React from 'react'
import { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import AntDesign from '@expo/vector-icons/AntDesign'
import { Avatar } from '@kolking/react-native-avatar'
import ProfileImg from '@/src/assets/images_app/avatar_users/image_profile.png'
import { Colors } from '@/src/constants/Colors'
import { Href, router } from 'expo-router'

type PostCardProps = {
  location: string
  user: string
  date: Date
  image: string
  description: string
}
export default function PostCard({
  location,
  image,
  description,
  user,
  date
}: PostCardProps) {
  const [count, setCount] = React.useState(1)

  const [liked, setLiked] = useState(false)
  const handleLike = () => {
    if (!liked) {
      setCount(count + 1)
      setLiked(true)
    } else {
      setCount(count - 1)
      setLiked(false)
    }
  }

  return (
    <SafeAreaView className="w-80% bg-white border border-gray-300 jusfify-center m-2  space-y-3">
      <View className="flex-row mx-2">
        <View className="flex-row flex-1 items-center space-x-3">
          <Avatar
            className=""
            source={ProfileImg}
            color={Colors.text}
            radius={30}
            size={30}
          />
          <Text className="text-coloricon  font-extrabold   ">{user}</Text>
        </View>

        <AntDesign name="ellipsis1" size={28}></AntDesign>
      </View>

      <Image source={{ uri: image }} className=" h-72 mx-2" />

      <View className="flex flex-row items-center space-x-3   justify-start mx-2">
        <View className="flex-row items-center space-x-3   ">
          <AntDesign
            name={liked ? 'heart' : 'hearto'} // Cambiar el ícono según si el usuario ha dado like
            size={28}
            color={liked ? 'red' : 'black'} // Cambiar el color del ícono
            onPress={handleLike} // Llamar a la función handleLike al presionar
          />
          <Text className="font-pbold">{count}</Text>
        </View>
        <Pressable onPress={() => router.push('/post/Comments' as Href)}>
          <View className="flex-row items-center }   ">
            <AntDesign name="message1" size={28}></AntDesign>
          </View>
        </Pressable>
        <View className="flex-row items-center   justify-content ">
          <AntDesign name="staro" size={28} className="ml-1"></AntDesign>
        </View>
      </View>

      <View className="flex-row py-2 mx-2">
        <View className="flex flex-1 flex-row">
          <AntDesign name="enviromento" size={20}></AntDesign>
          <Text className="text-coloricon text-14pxfont-pbold ">{location}</Text>
        </View>

        <Text>{date.toLocaleDateString()}</Text>
      </View>
      <Text className="mx-2 my-2">{description}</Text>
    </SafeAreaView>
  )
}
