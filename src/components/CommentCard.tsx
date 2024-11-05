import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
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
  deleteComment: () => void
  editComment: () => void
  isEditing: boolean
  editText: string
  setEditText: (text: string) => void
  saveEdit: () => void
}

function CommentCard({
  Comments,
  deleteComment,
  editComment,
  isEditing,
  editText,
  setEditText,
  saveEdit
}: CommentCardProps) {
  const { EditIcon, TrashIcon, ArchiveIcon } = Icons

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

        {isEditing ? (
          <TextInput
            value={editText}
            onChangeText={setEditText}
            className="px-5 border border-gray-300 rounded-md"
          />
        ) : (
          <Text className="px-5">{Comments.commentText}</Text>
        )}
      </View>

      {/* Sección de íconos de edición y eliminación */}
      <View className="flex flex-col space-y-5">
        {isEditing ? (
          <Pressable onPress={saveEdit}>
            <ArchiveIcon padding={0} />
          </Pressable>
        ) : (
          <Pressable onPress={editComment}>
            <EditIcon padding={0} />
          </Pressable>
        )}
        <Pressable onPress={deleteComment}>
          <TrashIcon color="black" />
        </Pressable>
      </View>
    </View>
  )
}

export default CommentCard
