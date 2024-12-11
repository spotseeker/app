import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Avatar } from '@kolking/react-native-avatar'
import { Colors } from '@/src/constants/Colors'
import Modal from '@/src/components/Modal'
import Rating from './Rating'
import { Href, Link, router } from 'expo-router'
import Icons from './Icons'
import ModalAction from './ModalAction'
import PagerView from 'react-native-pager-view'
import { Post } from '../types/post'
import { useBookmarkPost, useLikePost } from '../hooks/usePost'

export default function PostCard({
  id,
  body,
  createdAt,
  images,
  locationId,
  score,
  likes,
  user
}: Post) {
  const [count, setCount] = useState(likes)
  const [liked, setLiked] = useState(false)
  const [taps, setTaps] = useState(0)
  const [bookmark, setBookmark] = useState(false)
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false)
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false)
  const [modalAction, setModalAction] = useState<'archive' | 'delete' | null>(null)
  const { RenderStar } = Rating
  const { TrashIcon, EditIcon, ArchiveIcon2 } = Icons
  const { bookMark } = useBookmarkPost(id)
  const { like } = useLikePost(id)

  const createdAtDate = new Date(createdAt)

  const handleLike = async () => {
    await like()
    if (likes) setCount(liked ? likes - 1 : likes + 1)
    setLiked(!liked)
  }

  useEffect(() => {
    if (taps == 2) {
      handleLike()
      setTaps(0)
    }
  }, [taps])

  const handleBookmark = async () => {
    await bookMark()
    setBookmark(true)
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
    <SafeAreaView
      className="w-80% bg-white border border-gray-300 justify-center m-2 "
      style={{ elevation: 4 }}
    >
      <View className="flex-row mx-1 my-2">
        <View className="flex-row flex-1 items-center space-x-1">
          <Pressable onPress={() => router.push(`/profile/${user.username}`)}>
            <Avatar
              source={{ uri: user.avatar }}
              color={Colors.text}
              radius={30}
              size={35}
            />
          </Pressable>
          <Text className="text-coloricon font-extrabold">{user.username}</Text>
        </View>
        <View className="flex-row  items-center space-x-1">
          {/* modificar para que muestre si los username non distintos el del post y el usuario logeado. */}
          {user.username && (
            <Pressable onPress={() => setOptionsModalVisible(true)}>
              <AntDesign name="ellipsis1" size={28} style={styles.iconEllipsis} />
            </Pressable>
          )}
        </View>
      </View>

      <Pressable onPress={() => setTaps(taps + 1)} className="mx-2">
        <PagerView style={styles.pagerView} initialPage={0}>
          {(() => {
            const pages: JSX.Element[] = []
            for (let i = 0; i < images.length; i++) {
              const img = images[i]
              pages.push(
                <View key={i} style={styles.page}>
                  <Image source={{ uri: img.media }} style={styles.image} />
                </View>
              )
            }
            return pages
          })()}
        </PagerView>
      </Pressable>

      <View className="flex flex-row items-center space-x-3 justify-start mx-4">
        <View className="flex-row flex flex-1 items-center space-x-3">
          <View className="flex-row items-center space-x-3">
            <AntDesign
              name={liked ? 'heart' : 'hearto'}
              size={28}
              color={liked ? 'red' : 'black'}
              onPress={handleLike}
            />
            <Text style={styles.likeCount}>{count}</Text>
          </View>
          <Link href={`/post/${id}` as Href} asChild>
            <Pressable>
              <View style={styles.commentButton}>
                <AntDesign name="message1" size={28} />
              </View>
            </Pressable>
          </Link>

          <View style={styles.actionGroup}>
            <AntDesign
              name={`${bookmark ? 'star' : 'staro'}`}
              color={`${bookmark ? '#eeaf61' : 'black'}`}
              size={28}
              onPress={handleBookmark}
            />
          </View>
        </View>
        <View style={styles.ratingContainer} className="mx-2">
          <RenderStar rating={score} />
          <Text style={styles.ratingText}>{score}</Text>
        </View>
      </View>

      <View className="flex-row py-2 mx-2">
        <View className="flex flex-1 flex-row">
          <AntDesign name="enviromento" size={20} />
          <Text style={styles.locationText}>{locationId}</Text>
        </View>

        <View className="ml-[-55] mr-[10]">
          <Text>{createdAtDate.toLocaleDateString()}</Text>
        </View>
      </View>
      <Text className="mx-3 my-3">{body}</Text>

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
  },
  pagerView: {
    height: 200,
    marginBottom: 10
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})
