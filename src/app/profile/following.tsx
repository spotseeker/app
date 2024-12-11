/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Icons from '@/src/components/Icons'
import { useFollowingList } from '@/src/hooks/useProfile'
import { router, useNavigation } from 'expo-router'
import { UserService } from '@/src/api/user'
import { User } from '@/src/types/user'
import { userListFollowers } from '@/src/hooks/useProfile'
import { useAuthContext } from '@/src/context/context'

const UserFollowing = ({ username }: User) => {
  const { ArrowBack } = Icons
  const { myUsername } = useAuthContext()
  const navigation = useNavigation()
  const { followers } = useFollowingList(1, myUsername)
  const api = new UserService()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      gestureEnabled: false,
      title: '',
      headerTitle: 'Siguiendo',
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push(`/(tabs)/${myUsername}`)}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const toggleFollow = (username: string) => {
    api.unfollowUser(username)
  }

  const handleNavigateToProfile = (username: string) => {
    router.push(`/(tabs)/${username}`)
  }

  const renderFollowing = ({ item }: any) => (
    <Pressable onPress={() => handleNavigateToProfile(item.username)}>
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
          data={followers?.results}
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
