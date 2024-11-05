import CommentCard from '@/src/components/CommentCard'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Comments from '@/src/fixtures/Comments'
import { useForm } from 'react-hook-form'
import { Avatar } from '@kolking/react-native-avatar'
import avatar1 from '../../assets/images_app/avatar_users/image_profile.png'
import { Colors } from '@/src/constants/Colors'
import Input from '@/src/components/Input'

function PostComments() {
  const navigation = useNavigation()
  const { ArrowBack, SendIcon } = Icons
  const { control } = useForm({})

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      gestureEnabled: false,
      title: '',
      headerTitle: 'Post',
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="space-y-5">
        {Comments.map((comment, index) => (
          <View className="my-5 mx-5" key={index}>
            <CommentCard
              Comments={{ ...comment, alignLeft: index % 2 === 0 }} // Alterna la alineación
            />
          </View>
        ))}
      </ScrollView>

      {/* Contenedor de entrada de comentario fijo en la parte inferior */}
      <View className="absolute bottom-0 left-0 right-0 bg-white h-20 p-3 border-t border-gray-300 flex-row items-center space-x-6">
        <Avatar source={avatar1} color={Colors.text} radius={30} size={30} />

        {/* Contenedor estilizado para el Input */}
        <View className=" pb-10">
          <Input
            name="comment"
            variant="comment"
            control={control}
            placeholder="Escribe un comentario"
          />
        </View>

        <TouchableOpacity>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PostComments
