import React from 'react'
import { View, Text } from 'react-native'
import { Avatar } from '@kolking/react-native-avatar'
import { Colors } from '@/src/constants/Colors'
import Icons from './Icons'

type CommentProps = {
  Avatar: number
  name: string
  commentText: string
  alignLeft?: boolean
}

type CommentCardProps = {
  Comments: CommentProps
}

function CommentCard({ Comments }: CommentCardProps) {
  const { EditIcon, TrashIcon } = Icons

  return (
    <View
      className={`w-[261px] min-h-[70] bg-[#E5D0D0] rounded-lg p-3 m-3 flex flex-row items-center justify-between ${
        Comments.alignLeft ? 'self-start' : 'self-end'
      }`}
    >
      {/* Sección de Avatar y comentario */}
      <View className="flex flex-col flex-1 space-y-1">
        <View className="flex flex-row items-center space-x-2">
          <Avatar source={Comments.Avatar} color={Colors.text} radius={30} size={30} />
          <Text className="font-bold">{Comments.name}</Text>
        </View>
        <Text className="px-5">{Comments.commentText}</Text>
      </View>

      {/* Sección de íconos de edición y eliminación */}
      <View className="flex flex-col space-y-5">
        <View>
          <EditIcon padding={0} />
        </View>
        <View>
          <TrashIcon color="black" />
        </View>
      </View>
    </View>
  )
}

export default CommentCard
