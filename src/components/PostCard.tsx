import * as React from 'react'
import { useState } from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Avatar } from '@kolking/react-native-avatar'
import ProfileImg from '@/src/assets/images_app/avatar_users/image_profile.png'
import { Colors } from '@/src/constants/Colors'
import Modal from '@/src/components/Modal'
import Rating from './Rating'
import { router } from 'expo-router'
import Icons from './Icons'
import ModalAction from './ModalAction'

type PostCardProps = {
  location: string
  user: string
  date: Date
  image: string
  description: string
  isOwnProfile?: boolean
  rating: number
}

export default function PostCard({
  location,
  image,
  description,
  user,
  date,
  isOwnProfile,
  rating
}: PostCardProps) {
  const [count, setCount] = useState(1)
  const [liked, setLiked] = useState(false)
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false)
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [modalAction, setModalAction] = useState<'archive' | 'delete' | null>(null)
  const { RenderStar } = Rating
  const { TrashIcon, EditIcon, ArchiveIcon2 } = Icons

  const handleLike = () => {
    setCount(liked ? count - 1 : count + 1)
    setLiked(!liked)
  }

  const openConfirmationModal = (action: 'archive' | 'delete') => {
    setModalAction(action)
    setOptionsModalVisible(false)
    setConfirmationModalVisible(true)
  }

  const handleCloseModal = () => {
    setConfirmationModalVisible(false)
  }

  const handleArchive = () => {
    console.log('Post archivado')
    setConfirmationModalVisible(false)
  }

  const handleDelete = () => {
    console.log('Post eliminado')
    setConfirmationModalVisible(false)
  }

  return (
    <SafeAreaView className="w-80% bg-white border border-gray-300 justify-center m-2 space-y-3">
      <View className="flex-row mx-2">
        <View className="flex-row flex-1 items-center space-x-3">
          <Avatar source={ProfileImg} color={Colors.text} radius={30} size={30} />
          <Text className="text-coloricon font-extrabold">{user}</Text>
        </View>
        {isOwnProfile && (
          <Pressable onPress={() => setOptionsModalVisible(true)}>
            <AntDesign name="ellipsis1" size={28} style={styles.iconEllipsis} />
          </Pressable>
        )}
      </View>

      <Image source={{ uri: image }} className="h-72 mx-2" />

      <View className="flex flex-row items-center space-x-3 justify-start mx-2">
        <View className="flex-row items-center space-x-3">
          <AntDesign
            name={liked ? 'heart' : 'hearto'}
            size={28}
            color={liked ? 'red' : 'black'}
            onPress={handleLike}
          />
          <Text style={styles.likeCount}>{count}</Text>
        </View>
        <Pressable onPress={() => router.push('/post/Comments')}>
          <View style={styles.commentButton}>
            <AntDesign name="message1" size={28} />
          </View>
        </Pressable>
        <View style={styles.actionGroup}>
          <AntDesign name="staro" size={28} />
        </View>
        <View style={styles.ratingContainer}>
          <RenderStar rating={rating} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <AntDesign name="enviromento" size={20} />
        <View className="mr-[130]">
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View className="ml-[-55] mr-[10]">
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </View>
      <Text>{description}</Text>

      {/* Modal de opciones */}
      <Modal
        visible={isOptionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
        backgroundColor="white"
      >
        <View className="flex-row mr-[8] pb-[10]">
          <Text
            className="text-lightc font-pbold"
            onPress={() => {
              setOptionsModalVisible(false)
              router.push('/post/EditPost')
            }}
            style={styles.modalOption}
          >
            Editar
          </Text>
          <View className="ml-[150] pl-[30] pb-[10]">
            <EditIcon color={Colors.text} />
          </View>
        </View>
        <View className="flex-row mr-[10] ml-[10] pb-[20]">
          <Text
            className="text-lightc font-pbold"
            onPress={() => openConfirmationModal('archive')}
            style={styles.modalOption}
          >
            Archivar
          </Text>
          <View className="ml-[160] pl-[20] pb-[20] pr-[10]">
            <ArchiveIcon2 />
          </View>
        </View>
        <View className="flex-row mr-[10] pb-[10]">
          <Text
            className="font-pbold text-complementaryB"
            onPress={() => openConfirmationModal('delete')}
            style={styles.modalOption}
          >
            Eliminar
          </Text>
          <View className="ml-[150] pl-[25]">
            <TrashIcon color="#FF0000" />
          </View>
        </View>
        <Pressable onPress={() => setOptionsModalVisible(false)}>
          <Text style={styles.modalClose}>Cerrar</Text>
        </Pressable>
      </Modal>

      {/* Modal de confirmación */}
      <ModalAction
        action="confirmation"
        visible={isConfirmationModalVisible}
        onClose={handleCloseModal}
        message={
          modalAction === 'delete'
            ? '¿Estás seguro de que deseas borrar esta publicación?'
            : '¿Estás seguro de que deseas archivar esta publicación?'
        }
        onConfirm={modalAction === 'delete' ? handleDelete : handleArchive}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  iconEllipsis: {
    color: Colors.secondaryText
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8
  },
  likeCount: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  commentButton: {
    marginHorizontal: 8
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tabIconSelected,
    borderRadius: 20,
    padding: 8,
    marginLeft: 120,
    width: 80
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  modalOption: {
    paddingVertical: 10
  },
  modalClose: {
    marginTop: 10,
    fontSize: 16,
    color: 'grey'
  }
})
