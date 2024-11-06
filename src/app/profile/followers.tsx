import React, { useEffect } from 'react'
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
import Img1 from '@/src/assets/images_app/avatar_users/Ellipse 11.png'
import Img2 from '@/src/assets/images_app/avatar_users/Ellipse 14.png'
import Img3 from '@/src/assets/images_app/avatar_users/Ellipse 14 (1).png'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'

type Follower = {
  id: string
  username: string
  uri: ImageSourcePropType
}

const UserFollowers = () => {
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

  const followersData: Follower[] = [
    { id: '1', username: 'Andresjpg', uri: images[0] },
    { id: '2', username: 'Yohanna33', uri: images[1] },
    { id: '3', username: 'Davidbqto', uri: images[2] }
  ]

  const renderFollower = ({ item }: { item: Follower }) => (
    <Pressable onPress={() => router.push('/profile/otherUser/OtherProfile')}>
      <View style={styles.followerItem}>
        <Avatar source={item.uri} size={40} />
        <Text className="text-primary font-pbold ml-[10]">{item.username}</Text>
      </View>
    </Pressable>
  )

  return (
    <SafeAreaView>
      <Screen>
        <View className="flex-1 justify-start content-start mt-[-20%]">
          <FlatList
            data={followersData}
            keyExtractor={(item) => item.id}
            renderItem={renderFollower}
            style={styles.followersList}
          />
        </View>
      </Screen>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'flex-start'
  },
  followersList: {
    marginTop: Dimensions.get('window').height * -0.6,
    paddingTop: Dimensions.get('window').height * 0.2
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  }
})

export default UserFollowers
