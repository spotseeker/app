import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreatePosts from '@/src/app/screens/createPost'
import { usecreatePostApi } from '@/src/hooks/usePost'
import { upload } from 'cloudinary-react-native'
import { cld } from '@/src/hooks/cloudinary'
import { avatarUploaded } from '@/src/types/user'
import ModalAction from '@/src/components/ModalAction'
function NewPost() {
  const { ArrowBack, CrossDeleteIcon, RefreshIcon } = Icons
  const [step, setStep] = useState(1)
  const navigation = useNavigation()
  const [image, setImage] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [description, setDescription] = useState<string>()
  const [modalVisible, setModlVisible] = useState(false)

  const headerTitleStep = () => {
    switch (step) {
      case 1:
        return 'Crear publicación nueva'
      case 2:
        return 'Seleccionar imagen'
      case 3:
        return 'Añadir ubicación'
      case 4:
        return 'Añadir etiquetas'
      default:
        return 'Crear publicación nueva'
    }
  }

  const headerRightSideStep = () => {
    switch (step) {
      case 1:
        return ''
      case 2:
        return (
          <Pressable onPress={() => setImage([])}>
            <CrossDeleteIcon color="#ee5d6c" />
          </Pressable>
        )
      case 3:
        return <RefreshIcon />
      case 4:
        return ''
      default:
        return ''
    }
  }

  const uploadImage = async (file: string): Promise<string | undefined> => {
    if (!file) {
      return undefined
    }

    const options = {
      upload_preset: 'spotseeker',
      unsigned: true
    }

    try {
      const response = await new Promise<avatarUploaded>((resolve, reject) => {
        upload(cld, {
          file: file,
          options: options,
          callback: (error, response) => {
            if (error || !response) {
              reject(error)
            } else {
              resolve({
                publicID: response?.public_id,
                url: response?.secure_url
              })
            }
          }
        })
      })
      console.log('Imagen subida con éxito', response.url)
      return response.url
    } catch (error) {
      console.error('Error al subir la imagen', error)
      throw error
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      gestureEnabled: false,
      title: '',
      headerTitle: headerTitleStep(),
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRight: () => (
        <Pressable onPress={() => ''}>{headerRightSideStep()}</Pressable>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={step !== 1 ? () => setStep(1) : () => router.push('/(tabs)/home')}
        >
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation, step])

  const postDataForm = {
    images: image
      ? image.map((image: string, index: number) => ({
          media: image,
          order: index + 1
        }))
      : [],
    body: hashtags
      ? 'testeando' + (hashtags.map((hashtag) => ' ' + hashtag).join('') || '')
      : 'test2',
    location_code: location,
    score: score,
    is_archived: false
  }

  const { createPost } = usecreatePostApi(postDataForm)
  useEffect(() => {
    const response = async () => {
      try {
        if (description?.trim() === '') {
          console.log('El comentario no puede estar vacío.')
          return
        }

        if (!postDataForm.images.length) {
          console.log('Al menos una imagen es necesaria para realizar el post.')
          return
        }

        if (location.trim() === '') {
          console.log('Selecciona una ubicación.')
          return
        }

        // Subir todas las imágenes de manera asincrónica
        const uploadedImages = await Promise.all(
          postDataForm.images.map(async (image: { media: string; order: number }) => {
            const uploadedMedia = await uploadImage(image.media)

            // Si uploadImage devuelve undefined, asignamos un valor por defecto

            const mediaUrl = uploadedMedia || '' // Aquí puedes poner un valor por defecto o manejar el error como desees

            return { media: mediaUrl, order: image.order }
          })
        )

        // Actualiza las imágenes subidas en el postDataForm
        postDataForm.images = uploadedImages

        if (!postDataForm.images[0].media) {
          console.log('hubo un error al subir la imagen')
          return
        }
        console.log(postDataForm)

        // Crear el post solo si todo es válido
        await createPost()
        setModlVisible(true)
        setDescription('')
        return false
      } catch (err) {
        console.log(err)
      }
    }

    if (description) {
      response()
        .then((modal) => {
          if (modal) {
            setModlVisible(modal)
          }
        })
        .catch((err) => {
          console.error('Error al obtener la respuesta:', err)
        })
    }
  }, [description])

  return (
    <SafeAreaView edges={['bottom']} className="w-full h-full bg-white flex-1">
      <CreatePosts
        step={step}
        setStep={setStep}
        image={image as string[]}
        setImage={setImage}
        location={location}
        setLocation={setLocation}
        hashtags={hashtags}
        setHashtags={setHashtags}
        score={score}
        setScore={setScore}
        setDescription={setDescription}
      />
      <ModalAction
        action="success"
        message="Post creado exitosamente"
        visible={modalVisible}
        onClose={() => router.push('/(tabs)/home')}
      />
    </SafeAreaView>
  )
}

export default NewPost
