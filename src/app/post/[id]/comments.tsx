import CommentCard from '@/src/components/CommentCard'
import Icons from '@/src/components/Icons'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import { Avatar } from '@kolking/react-native-avatar'
import avatar1 from '@/src/assets/images_app/avatar_users/image_profile.png'
import { Colors } from '@/src/constants/Colors'
import Input from '@/src/components/Input'
import ModalAction from '@/src/components/ModalAction'
import {
  useCommentPost,
  useCommentsList,
  useDeleteComment,
  useUpdateComment
} from '@/src/hooks/usePost'
import { CommentsBody } from '@/src/types/post'

function Comments() {
  const navigation = useNavigation()
  const { ArrowBack, SendIcon } = Icons
  const { control, handleSubmit, reset, getValues } = useForm({})
  const [comments, setComments] = useState<CommentsBody[]>()
  const [isModalVisible, setModalVisible] = useState(false)
  const [commentIndex, setCommentIndex] = useState<number>(-1)
  const [editIndex, setEditIndex] = useState<number | null>(null) // Índice del comentario en edición
  const [editText, setEditText] = useState<string>('') // Texto temporal del comentario en edición
  const [commentText, setCommentText] = useState('')
  const { id } = useLocalSearchParams()

  const { commentsList, isLoading } = useCommentsList(id)
  const { createComment, data } = useCommentPost(id, commentText)
  const { deleteCommentApi } = useDeleteComment(
    id,
    (comments && comments[commentIndex!]?.id) || ''
  )

  const { updateComment } = useUpdateComment(
    id,
    (comments && comments[commentIndex!]?.id) || '',
    editText
  )

  useEffect(() => {
    if (commentsList) {
      setComments(commentsList.results)
    }
  }, [commentsList])

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
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  useEffect(() => {
    const response = async () => {
      try {
        const commentValue = getValues('comment')
        if (commentValue.trim() === '') {
          console.log('El comentario no puede estar vacío.')
          return
        }

        await createComment(commentValue)
        reset({ comment: '' })
        if (data && comments) {
          setComments([...comments, data])
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (commentText) {
      response() // Llamar la función asíncrona cuando el comentario cambie
    }
  }, [commentText])

  const onSubmit = () => {
    setCommentText(getValues('comment'))
  }

  const handleEditComment = (index: number) => {
    setCommentIndex(index)
    setEditIndex(index)
    if (comments) {
      setEditText(comments[index].comment)
    }
  }

  const saveEditedComment = async () => {
    if (comments) {
      try {
        await updateComment()
      } catch (err) {
        console.log(err)
      } finally {
        setCommentIndex(-1)
      }
    }
    setEditIndex(null)
  }

  const handleDeleteComment = (index: number) => {
    setCommentIndex(index)
    setModalVisible(true)
  }

  const deleteComment = async () => {
    if (comments) {
      try {
        await deleteCommentApi()
      } catch (err) {
        console.log(err)
      } finally {
        setCommentIndex(-1)
      }
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return isLoading ? (
    <View>
      <Text>Cargando...</Text>
    </View>
  ) : (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="space-y-5">
        {comments &&
          comments.map((comment, index) => (
            <CommentCard
              key={comment.id}
              comments={{
                user: comment.user,
                comment: comment.comment,
                alignLeft: index % 2 === 0
              }}
              deleteComment={() => handleDeleteComment(index)}
              editComment={() => handleEditComment(index)}
              isEditing={editIndex === index}
              editText={editText}
              setEditText={setEditText}
              saveEdit={() => saveEditedComment()}
            />
          ))}
        <ModalAction
          action="confirmation"
          visible={isModalVisible}
          onClose={handleCloseModal}
          message="¿Seguro que quieres eliminar este comentario?"
          onConfirm={() => deleteComment()}
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

export default Comments
