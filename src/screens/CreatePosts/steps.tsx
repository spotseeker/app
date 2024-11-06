import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Icons from '@/src/components/Icons'
import { Control } from 'react-hook-form'
import OptionItem from '@/src/components/OptionItem'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import Rating from '@/src/components/Rating'
type createPostScreenProps = {
  image: string[]
  control: Control
  setStep: (step: number) => void
}

interface SelectImageScreenProps {
  image: string[]
  setImage: (uris: string[]) => void
}

const CreatePostScreen1 = ({ image, control, setStep }: createPostScreenProps) => {
  const { ImageIcon1, ImageIcon2, HashTagIcon, StarIconColorized, MapMarkerIcon } = Icons
  const [rate, setRate] = useState(0)
  const { SetRating } = Rating
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
          name="desciption"
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
          <SetRating rating={rate} setRating={setRate} />
        </OptionItem>
      </View>
      <View className="flex justify-center items-center my-[25px]">
        <Button width={288} height={48} variant="primary">
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
      quality: 1
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
export default { CreatePostScreen1, SelectImageScreen }
