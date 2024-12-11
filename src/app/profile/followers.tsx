/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  //ImageSourcePropType,
  Dimensions,
  TouchableOpacity,
  Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from '@kolking/react-native-avatar'
import Screen from '@/src/components/Screen'

import Icons from '@/src/components/Icons'
import { router, useNavigation, Link, Href } from 'expo-router'
import { Follower, UserResponse, User } from '@/src/types/user'
import { userListFollowers } from '@/src/hooks/useProfile'
import { useAuthContext } from '@/src/context/context'
import { useUserProfile } from '@/src/hooks/useProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
//type Follower = {
// id: string
// username: string
//uri: ImageSourcePropType
//}

const UserFollowers = ({ username }: UserResponse) => {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  const { myUsername } = useAuthContext()
  const [profile, setProfile] = useState<UserResponse>()
  const isMyProfile = myUsername === username
  const userInfo = isMyProfile ? myUsername : username
  const { profile: userProfile } = useUserProfile(userInfo)
  const { followers } = userListFollowers(1, myUsername)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    console.log('Data de los seguidores', followers)
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
        <TouchableOpacity onPress={() => router.push(`/(tabs)/${username}`)}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const handleUsernameStorage = async () => {
    if (profile) {
      try {
        setProfile(userProfile)
        await AsyncStorage.setItem('lastUsername', username)
      } catch (error) {
        console.error('Error storing username:', error)
      }
    }
  }

  const renderFollower = ({ item }: { item: Follower }) => (
    <Link href={`/(tabs)/${item.username}`} asChild>
      <Pressable onPress={handleUsernameStorage}>
        <View style={styles.followerItem}>
          <Avatar source={{ uri: item?.avatar }} size={40} />
          <Text className="text-primary font-pbold ml-[10]">{item.username}</Text>
        </View>
      </Pressable>
    </Link>
  )

  return (
    <SafeAreaView>
      <Screen>
        <View className="flex-1 justify-start content-start mt-[-20%]">
          <FlatList
            data={followers?.results}
            keyExtractor={(item) => item.username}
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
