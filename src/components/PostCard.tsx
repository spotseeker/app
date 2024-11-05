import * as React from 'react'
import { useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Avatar } from '@kolking/react-native-avatar'
import ProfileImg from '@/src/assets/images_app/avatar_users/image_profile.png'
import { Colors } from '@/src/constants/Colors'
import { Href, router } from 'expo-router'
import Modal from '@/src/components/Modal'
import Rating from './Rating'

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
  const [modalVisible, setModalVisible] = useState(false)
  const { RenderStar } = Rating
  const handleLike = () => {
    if (!liked) {
      setCount(count + 1)
      setLiked(true)
    }
  }

  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Avatar source={ProfileImg} color={Colors.text} radius={30} size={30} />
        <Text style={styles.textUser}>{user}</Text>
        {isOwnProfile && (
          <Pressable onPress={() => setModalVisible(true)}>
            <AntDesign name="ellipsis1" size={28} style={styles.iconEllipsis} />
          </Pressable>
        )}
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.actionRow}>
        <View style={styles.actionGroup}>
          <AntDesign
            name={liked ? 'heart' : 'hearto'}
            size={28}
            color={liked ? 'red' : 'black'}
            onPress={handleLike}
          />
          <Text style={styles.likeCount}>{count}</Text>
        </View>
        <Pressable onPress={() => router.push('/posting/PostComments' as Href)}>
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
        <View className="mr-[130] ">
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <View className="ml-[-55] mr-[10]">
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </View>
      <Text>{description}</Text>

      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        backgroundColor="white"
      >
        <Text onPress={() => router.push('/posting/EditPost')} style={styles.modalOption}>
          Editar
        </Text>
        <Text onPress={() => console.log('Eliminar post')} style={styles.modalOption}>
          Eliminar
        </Text>
        <Text onPress={() => console.log('Archivar post')} style={styles.modalOption}>
          Archivar
        </Text>
        <Pressable onPress={() => setModalVisible(false)}>
          <Text style={styles.modalClose}>Cerrar</Text>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginVertical: 8
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  textUser: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginLeft: 8
  },
  iconEllipsis: {
    color: Colors.secondaryText
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain'
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
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
    fontSize: 18,
    paddingVertical: 10,
    color: Colors.secondaryText
  },
  modalClose: {
    marginTop: 10,
    fontSize: 16,
    color: 'grey'
  }
})
