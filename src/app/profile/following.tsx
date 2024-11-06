import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
  TouchableOpacity,
  Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from '@kolking/react-native-avatar'
import Screen from '@/src/components/Screen'
import Button from '@/src/components/Button'
import Img1 from '@/src/assets/images_app/avatar_users/Ellipse 11.png'
import Img2 from '@/src/assets/images_app/avatar_users/Ellipse 14.png'
import Img3 from '@/src/assets/images_app/avatar_users/Ellipse 14 (1).png'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'

type Following = {
  id: string
  username: string
  uri: ImageSourcePropType
  isFollowing: boolean
}

const UserFollowing = () => {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      gestureEnabled: false,
      title: '',
      headerTitle: 'Seguidores',
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  const images = [Img1, Img2, Img3]

  const [followingData, setFollowingData] = useState<Following[]>([
    { id: '1', username: 'Andresjpg', uri: images[0], isFollowing: true },
    { id: '2', username: 'Yohanna33', uri: images[1], isFollowing: true },
    { id: '3', username: 'Davidbqto', uri: images[2], isFollowing: false }
  ])

  const toggleFollow = (id: string) => {
    setFollowingData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    )
  }

  const renderFollowing = ({ item }: { item: Following }) => (
    <Pressable onPress={() => router.push('/profile/otherUser/OtherProfile')}>
      <View className="flex-1 justify-start content-start" style={styles.followingItem}>
        <Avatar source={item.uri} size={40} />
        <View style={styles.userInfo}>
          <Text className="text-primary font-pbold">{item.username}</Text>
        </View>
        <Button
          onPress={() => toggleFollow(item.id)}
          variant={item.isFollowing ? 'gray' : 'primary'}
          width={118}
          height={44}
        >
          <Text className="text-white font-pbold">
            {item.isFollowing ? 'Dejar de seguir' : 'Seguir'}
          </Text>
        </Button>
      </View>
    </Pressable>
  )

  return (
    <SafeAreaView>
      <Screen>
        <FlatList
          data={followingData}
          keyExtractor={(item) => item.id}
          renderItem={renderFollowing}
          style={styles.followingList}
        />
      </Screen>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  followingList: {
    marginTop: Dimensions.get('window').height * -0.7,
    paddingTop: Dimensions.get('window').height * 0.2
  },
  followingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  userInfo: {
    flex: 1,
    marginLeft: 10
  }
})

export default UserFollowing
