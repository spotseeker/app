import CommentCard from '@/src/components/CommentCard'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import { Avatar } from '@kolking/react-native-avatar'
import avatar1 from '../../assets/images_app/avatar_users/image_profile.png'
import { Colors } from '@/src/constants/Colors'
import Input from '@/src/components/Input'
import CommentsFixture from '@/src/fixtures/Comments'
import ModalAction from '@/src/components/ModalAction'

function PostComments() {
  const navigation = useNavigation()
  const { ArrowBack, SendIcon } = Icons
  const { control, handleSubmit, reset, getValues } = useForm({})
  const [comments, setComments] = useState(CommentsFixture)
  const [isModalVisible, setModalVisible] = useState(false)
  const [commentIndex, setCommentIndex] = useState<number>()
  const [editIndex, setEditIndex] = useState<number | null>(null) // Índice del comentario en edición
  const [editText, setEditText] = useState<string>('') // Texto temporal del comentario en edición

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

  const onSubmit = () => {
    const newComment = {
      Avatar: avatar1,
      name: 'Ricardolpj',
      commentText: getValues('comment')
    }

    setComments([...comments, newComment])
    reset({ comment: '' })
  }

  const handleEditComment = (index: number) => {
    setEditIndex(index)
    setEditText(comments[index].commentText) // Cargar el texto del comentario en el estado de edición
  }

  const saveEditedComment = (index: number) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index ? { ...comment, commentText: editText } : comment
      )
    )
    setEditIndex(null) // Salir del modo edición
  }

  const handleDeleteComment = (index: number) => {
    setCommentIndex(index)
    setModalVisible(true)
  }

  const deleteComment = (index: number) => {
    setComments((prevComments) => prevComments.filter((_, i) => i !== index))
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="space-y-5">
        {comments.map((comment, index) => (
          <View className="my-5 mx-5" key={index}>
            <CommentCard
              Comments={{
                Avatar: comment.Avatar,
                name: comment.name,
                commentText: comment.commentText,
                alignLeft: index % 2 === 0
              }}
              deleteComment={() => handleDeleteComment(index)}
              editComment={() => handleEditComment(index)}
              isEditing={editIndex === index}
              editText={editText}
              setEditText={setEditText}
              saveEdit={() => saveEditedComment(index)}
            />
          </View>
        ))}
        <ModalAction
          action="confirmation"
          visible={isModalVisible}
          onClose={handleCloseModal}
          message="¿Seguro que quieres eliminar este comentario?"
          onConfirm={() => deleteComment(commentIndex as number)}
        />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white h-20 p-3 border-t border-gray-300 flex-row items-center space-x-6">
        <Avatar source={avatar1} color={Colors.text} radius={30} size={30} />

        <View className="pb-10">
          <Input
            name="comment"
            variant="comment"
            control={control}
            placeholder="Escribe un comentario"
          />
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PostComments
