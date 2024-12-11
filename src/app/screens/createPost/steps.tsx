import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Icons from '@/src/components/Icons'
import { useForm } from 'react-hook-form'
import OptionItem from '@/src/components/OptionItem'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import Rating from '@/src/components/Rating'
import SearchInput from '@/src/components/SearchInput'
import { HashtagSchema, postSchema } from '@/src/schemas/hashtagSchema'
import HashtagInput from '@/src/components/HashtagInput'
import { useLocations } from '@/src/hooks/useLocations'
import { LocResponse } from '@/src/types/post'

type createPostScreenProps = {
  image: string[]
  score: number
  setStep: (step: number) => void
  setScore: (score: number) => void
  setDescription: (description: string) => void
}

interface SelectImageScreenProps {
  image: string[]
  setImage: (uris: string[]) => void
}

type SelectLocationScreenProps = {
  setLocation: (id: string) => void
  setStep: (step: number) => void
}

type SelectHashtagsScreenProps = {
  hashtags: string[]
  setHashtags: (hashtags: string[]) => void
}

const CreatePostScreen1 = ({
  image,
  setStep,
  setScore,
  score,
  setDescription
}: createPostScreenProps) => {
  const { ImageIcon1, ImageIcon2, HashTagIcon, StarIconColorized, MapMarkerIcon } = Icons
  const { SetRating } = Rating
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(postSchema) // Usar el resolver Zod
  })
  return (
    <View className="w-full h-full bg-white ">
      <View className="flex justify-center items-center ">
        <View
          className={`min-w-[344px] min-h-[157px] items-center flex justify-center ${image.length === 0 && 'border-[#eeaf61] border-solid border-2 rounded-lg p-7'} `}
        >
          {image.length > 0 ? (
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {image.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={{ width: 100, height: 100, borderRadius: 8, margin: 5 }} // Estilo de imagen
                />
              ))}
            </View>
          ) : (
            <ImageIcon2 />
          )}
        </View>

        <Input
          variant="description"
          placeholder="Escribe un texto o descripcion"
          name="body"
          control={control}
        >
          {}
        </Input>
      </View>
      <View className="flex justify-center items-center">
        <OptionItem
          title="Seleccionar imagen"
          leftItem={<ImageIcon1 />}
          setNavigator={() => setStep(2)}
        />
        <OptionItem
          title="Seleccionar ubicación"
          leftItem={<MapMarkerIcon size={25} />}
          setNavigator={() => setStep(3)}
        />
        <OptionItem
          title="Añadir etiquetas"
          leftItem={<HashTagIcon />}
          setNavigator={() => setStep(4)}
        />
        <OptionItem
          title="Puntuar experiencia"
          leftItem={<StarIconColorized shown={true} />}
        >
          <SetRating rating={score} setRating={setScore} />
        </OptionItem>
      </View>
      <View className="flex justify-center items-center my-[25px]">
        <Button
          width={288}
          height={48}
          variant="primary"
          onPress={handleSubmit((data) => {
            setDescription(data.body)
            reset()
          })}
        >
          Publicar
        </Button>
      </View>
    </View>
  )
}

const SelectImageScreen = ({ image, setImage }: SelectImageScreenProps) => {
  const { ImageIcon1, ImageIcon2, DeployIcon, CameraIcon } = Icons
  const [recentImages, setRecentImages] = useState<MediaLibrary.Asset[]>([])

  useEffect(() => {
    const fetchRecentImages = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          first: 9,
          sortBy: MediaLibrary.SortBy.creationTime
        })
        setRecentImages(media.assets)
      } else {
        console.log('No se ha otorgado el permiso para acceder a la galería.')
      }
    }

    fetchRecentImages()
  }, [])

  const handleCameraPress = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync()
    const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync()

    if (cameraStatus !== 'granted') {
      Alert.alert('Se necesitan permisos para acceder a la cámara!')
      return
    }

    if (mediaLibraryStatus !== 'granted') {
      Alert.alert('Se necesitan permisos para acceder a la galería!')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled && result.assets) {
      if (image.length < 3) {
        // Asegúrate de que prevImages sea de tipo string[]
        setImage([...image, result.assets[0].uri])
      } else {
        Alert.alert('Puedes seleccionar un máximo de 3 imágenes.')
      }
    }
  }

  const handleGalleryPress = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Se necesitan permisos para acceder a la galería!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      aspect: [4, 3],
      quality: 0.7,
      allowsEditing: true
    })

    if (!result.canceled && result.assets) {
      const selectedUris = result.assets.map((asset) => asset.uri)
      const newImages = [...image, ...selectedUris].slice(0, 3) // Limitar a un máximo de 3 imágenes

      if (newImages.length > 3) {
        Alert.alert('Puedes seleccionar un máximo de 3 imágenes.')
      }
      setImage(newImages) // Actualizar el estado con las nuevas imágenes
    }
  }

  return (
    <View className="w-full h-full bg-white">
      <View className="flex justify-center items-center">
        <View
          className={`min-w-[344px] min-h-[157px] items-center flex justify-center ${image.length === 0 && 'border-[#eeaf61] border-solid border-2 rounded-lg p-7'}`}
        >
          {image.length > 0 ? (
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {image.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={{
                    width: image.length == 1 ? 344 : 100,
                    height: image.length == 1 ? 157 : 100,
                    borderRadius: 8,
                    margin: 5
                  }} // Estilo de imagen
                />
              ))}
            </View>
          ) : (
            <ImageIcon2 />
          )}
        </View>
      </View>
      <View className="flex flex-row w-full justify-between justify-center items-center px-5 my-[30px] shadow-xl round-lg">
        <View className="flex flex-row flex-1 items-center space-x-[10px]">
          <Text className="font-bold text-[13px]">Recientes</Text>
          <View>
            <DeployIcon />
          </View>
        </View>
        <View className="flex flex-row items-center space-x-[10px]">
          <TouchableOpacity onPress={handleGalleryPress}>
            <ImageIcon1 />
          </TouchableOpacity>
          <Text className="font-bold text-[13px]">Múltiples Imágenes</Text>
          <TouchableOpacity onPress={handleCameraPress}>
            <CameraIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View className="flex flex-row flex-wrap justify-center">
          {recentImages.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (image.length < 3) {
                  setImage([...image, item.uri]) // Agregar imagen al estado
                } else {
                  Alert.alert('Puedes seleccionar un máximo de 3 imágenes.')
                }
              }}
              style={{ width: '33.3%', padding: 4 }}
            >
              <Image
                source={{ uri: item.uri }}
                style={{ width: '100%', height: 100, borderRadius: 8 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const SelectLocationScreen = ({ setLocation, setStep }: SelectLocationScreenProps) => {
  const [search, setSearch] = useState('')
  const { results, isLoading } = useLocations(search)
  const [locations, setLocations] = useState<LocResponse>()

  useEffect(() => {
    if (search != '' && results) {
      setLocations(results)
    } else {
      setLocations(undefined)
    }
  }, [results])

  return (
    <View className="w-full h-full bg-white">
      <View className="flex justify-center items-center">
        <SearchInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Buscar ubicación"
        />
      </View>

      {/* Mostrar indicador de carga */}
      {isLoading ? (
        <View className="flex items-center justify-center mt-4">
          <Text className="text-gray-500">Cargando ubicaciones...</Text>
          {/* También puedes usar un ActivityIndicator si prefieres */}
        </View>
      ) : (
        <View className="ml-[40] items-start">
          <ScrollView>
            {locations &&
              locations
                .filter((location) =>
                  location.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((location, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setLocation(location.placeId)
                      setStep(1)
                    }}
                  >
                    <Text className="text-lightc font-pbold text-[18px] mt-[10] p-[10]">
                      {location.name}
                    </Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const SelectHashtagsScreen = ({ hashtags, setHashtags }: SelectHashtagsScreenProps) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(HashtagSchema),
    mode: 'onChange'
  })
  const popularHashtags = [
    '#viaje',
    '#vacaciones',
    '#playa',
    '#montaña',
    '#ciudad',
    '#turismo'
  ]

  return (
    <View className="bg-white">
      <View className=" flex justify-center items-center">
        <HashtagInput
          text="Etiquetas agregadas"
          placeholder="etiquetas"
          value={`${hashtags.join(' ')}`}
        />
        <Input
          text="Añadir etiquetas"
          variant="default"
          placeholder="Añadir etiquetas"
          name="hashtag"
          control={control}
        />
      </View>
      <View className="mr-[40] items-end">
        <Button
          variant="primary"
          width={150}
          height={50}
          onPress={handleSubmit((data) => {
            setHashtags([...hashtags, data.hashtag])
            reset()
          })}
        >
          Añadir
        </Button>
      </View>
      <View className="flex justify-center items-center">
        <HashtagInput text="Etiquetas populares" value={`${popularHashtags.join(' ')}`} />
      </View>
    </View>
  )
}

export default {
  CreatePostScreen1,
  SelectImageScreen,
  SelectLocationScreen,
  SelectHashtagsScreen
}
