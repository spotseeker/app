import React, { useState, useEffect } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Text } from 'react-native'
import Button from '@/src/components/Button'
import Icons from '@/src/components/Icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Rating from '@/src/components/Rating'
import OptionItem from '@/src/components/OptionItem'
import ModalAction from '@/src/components/ModalAction'
import { Colors } from '@/src/constants/Colors'
import { useGetPostById, useUpdatePost } from '@/src/hooks/usePost'
import { Post, PostPatch } from '@/src/types/post'
import Input from '@/src/components/Input'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Esquema de validación
const EditPostSchema = z.object({
  comment: z.string().min(1, 'El comentario es obligatorio.')
})

const EditPostScreen = () => {
  const { StarIconColorized, ImageIcon2, ArrowBack, MapMarkerIcon } = Icons
  const navigation = useNavigation()
  const [isConfirmationVisible, setConfirmationVisible] = useState(false)
  const [isSuccessVisible, setSuccessVisible] = useState(false)
  const [isErrorVisible, setErrorVisible] = useState(false)
  const { RenderStar, SetRating } = Rating
  const [formerPostData, setFormerPostData] = useState<Post>()
  const { id } = useLocalSearchParams()
  const { postData } = useGetPostById(id)
  const [rate, setRate] = useState(formerPostData?.score as number)
  const archived = useState(formerPostData?.isArchived)
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(EditPostSchema)
  })
  const [postPatchData, setPostPatchData] = useState<PostPatch>()

  useEffect(() => {
    if (postData) {
      setFormerPostData(postData)
      console.log(formerPostData?.isArchived)
    }
  }, [postData])

  useEffect(() => {
    reset({ comment: formerPostData?.body })
  }, [formerPostData])

  const { updatePost, isError, isPending } = useUpdatePost(id, postPatchData as PostPatch)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitle: 'Editar Publicacion',
      headerTintColor: '#FB9062',
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

  const handleEditPost = () => {
    setConfirmationVisible(false)

    const response = async () => {
      try {
        await updatePost()
      } catch (err) {
        console.log('fallo al editar post', err)
      }
    }
    if (postPatchData) {
      response()
    }

    if (!isPending) {
      if (isError == true) {
        setSuccessVisible(false)
        setErrorVisible(true)
      } else {
        setSuccessVisible(true)
        setErrorVisible(false)
      }
    }
    reset()
    setConfirmationVisible(false)
  }

  const onSubmit = (data: FieldValues) => {
    // Actualiza los datos de postPatchData con la información del formulario
    setPostPatchData({
      ...postPatchData,
      body: data.comment,
      score: rate,
      isArchived: archived[0] ?? false, // Actualiza si es archivado
      location_id: formerPostData?.location.id || '', // Ubicación, si está disponible
      images: formerPostData?.images || [] // Si hay imágenes asociadas
    })
    setConfirmationVisible(true)
    console.log(postPatchData)
  }

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <ScrollView>
        <View
          className={`min-w-[344px] min-h-[400px] items-center flex justify-center mt-[-20%] ${!formerPostData?.images && 'border-[#eeaf61] border-solid border-2 rounded-lg p-7'}`}
        >
          {formerPostData?.images ? (
            <Image
              source={{ uri: formerPostData.images[0].media }}
              style={{ width: 350, height: 200, borderRadius: 8 }}
            />
          ) : (
            <ImageIcon2 />
          )}

          <View style={styles.ratingContainer}>
            <RenderStar rating={rate} />
            <Text style={styles.ratingText}>{rate}</Text>
          </View>
          <View className="flex-row mr-[100] pr-[20%] pt-[3px]">
            <MapMarkerIcon size={20} />
            <Text className="font-pbold text-helper text-[14px]">
              {formerPostData?.location.name}
            </Text>
          </View>
        </View>

        {/* Formulario */}
        <View className="mt-[-100px]">
          <View style={styles.content}>
            <Input
              name="comment"
              variant="description"
              control={control} // Aquí aseguramos que control sea de tipo EditPostForm
              placeholder="Escribe un comentario"
            />

            <View style={styles.divider} />

            <OptionItem
              title="Cambiar puntuacion"
              leftItem={<StarIconColorized shown={true} />}
            >
              <SetRating rating={rate} setRating={setRate} />
            </OptionItem>

            <View style={styles.divider} />

            <View className="items-center mt-[100] pb-[10%]">
              <Button
                width={288}
                height={48}
                variant="primary"
                onPress={handleSubmit((data) => onSubmit(data))}
              >
                Actualizar
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modales */}
      <ModalAction
        visible={isConfirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleEditPost}
        action="confirmation"
        message="¿Estás seguro de aplicar estos cambios?"
      />

      <ModalAction
        action="success"
        message="Publicación actualizada con éxito"
        visible={isSuccessVisible}
        onClose={() => setSuccessVisible(false)}
      />

      <ModalAction
        action="error"
        message="Hubo un error al actualizar la información de la publicación. Por favor, verifica los datos."
        visible={isErrorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginTop: 50
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tabIconSelected,
    borderRadius: 20,
    padding: 8,
    marginTop: 20,
    marginLeft: 250,
    paddingLeft: 10,
    width: 80
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 112,
    backgroundColor: '#E6E9EA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    marginBottom: 20
  },
  inputContainerExpanded: {
    width: 344
  },
  input: {
    flex: 1,
    height: '100%',
    textAlignVertical: 'top'
  },
  divider: {
    height: 1,
    width: '200%',
    marginLeft: '-20%',
    backgroundColor: '#cccc',
    elevation: 5,
    marginVertical: 20
  }
})
export default EditPostScreen
