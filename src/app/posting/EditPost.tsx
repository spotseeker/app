import React, { useState, useEffect } from 'react'
import { router, useNavigation } from 'expo-router'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text
} from 'react-native'
import Button from '@/src/components/Button'
import Icons from '@/src/components/Icons'
import { post } from '@/src/fixtures/post'
import { SafeAreaView } from 'react-native-safe-area-context'
import Rating from '@/src/components/Rating'
import OptionItem from '@/src/components/OptionItem'
import ModalAction from '@/src/components/ModalAction'

type EditProps = {
  postId: number
}

const EditPostScreen = ({ postId = 1 }: EditProps) => {
  const currentPost = post.find((p) => p.id === postId)
  const { EditIcon, ImageIcon2, StarIconColorized, ArrowBack, MapMarkerIcon } = Icons
  const [isExpanded, setIsExpanded] = useState(false)
  const [rate, setRate] = useState(0)
  const navigation = useNavigation()

  const [isConfirmationVisible, setConfirmationVisible] = useState(false)
  const [isSuccessVisible, setSuccessVisible] = useState(false)
  const [isErrorVisible, setErrorVisible] = useState(false)

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

    const success = Math.random() > 0.5
    if (success) {
      setSuccessVisible(true)
    } else {
      setErrorVisible(true)
    }
  }

  const onSubmit = () => {
    setConfirmationVisible(true)
  }

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <ScrollView>
        {/* Imagen */}
        <View
          className={`min-w-[344px] min-h-[400px] items-center flex justify-center mt-[-20%] ${!currentPost?.image && 'border-[#eeaf61] border-solid border-2 rounded-lg p-7'}`}
        >
          {currentPost?.image ? (
            <Image
              source={{ uri: currentPost.image }}
              style={{ width: 350, height: 200, borderRadius: 8 }}
            />
          ) : (
            <ImageIcon2 />
          )}
          <View className="flex-row mr-[100] pr-[20%] pt-[3px]">
            <MapMarkerIcon size={20} />
            <Text className="font-pbold text-helper text-[14px]">
              {' '}
              {currentPost?.location}
            </Text>
          </View>
        </View>

        {/* Formulario */}
        <View className="mt-[-100px]">
          <View style={styles.content}>
            {currentPost ? (
              <View
                style={[
                  styles.inputContainer,
                  isExpanded && styles.inputContainerExpanded
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Escribe un texto o descripción"
                  inputMode="text"
                  textAlignVertical="top"
                  defaultValue={currentPost.description}
                  onChangeText={(text) => {
                    console.log('Descripción actualizada:', text)
                  }}
                  editable={isExpanded}
                />
                {!isExpanded && (
                  <TouchableOpacity onPress={() => setIsExpanded(true)}>
                    <EditIcon size={20} />
                  </TouchableOpacity>
                )}
              </View>
            ) : null}

            <View
              style={{
                height: 1,
                width: '200%',
                marginLeft: '-20%',
                backgroundColor: '#cccc',
                elevation: 5,
                marginVertical: 20
              }}
            />

            <OptionItem
              title="Cambiar puntuacion"
              leftItem={<StarIconColorized shown={true} />}
            >
              <Rating rating={rate} setRating={setRate} />
            </OptionItem>

            <View
              style={{
                height: 1,
                width: '200%',
                marginLeft: '-20%',
                backgroundColor: '#cccc',
                elevation: 5,
                marginVertical: 20
              }}
            />

            <View className="items-center mt-[100] pb-[10%]">
              <Button width={288} height={48} variant="primary" onPress={onSubmit}>
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
        message="¿Estás seguro de  Aplicar estos cambios?"
      />

      <ModalAction
        action="success"
        message="Publicacion actualizada con exito"
        visible={isSuccessVisible}
        onClose={() => setSuccessVisible(false)}
      />

      <ModalAction
        action="error"
        message="Hubo un error al actualizar la información de la publicacion. Por favor, verifica  los datos."
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
  }
})

export default EditPostScreen
