import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from '@kolking/react-native-avatar'
import Screen from '@/src/components/Screen'
import Icons from '@/src/components/Icons'
import { useFollowingList } from '@/src/hooks/useProfile'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'

const UserFollowing = () => {
  const { ArrowBack } = Icons
  const { username } = useLocalSearchParams()
  const normalizedUsername = Array.isArray(username) ? username[0] : username
  const navigation = useNavigation()
  const { followers } = useFollowingList(1, normalizedUsername)

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
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const handleNavigateToProfile = (username: string) => {
    router.push(`/profile/${username}`)
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const renderFollowing = ({ item }: any) => (
    <Pressable onPress={() => handleNavigateToProfile(item.username)}>
      <View className="flex-1 justify-start content-start" style={styles.followingItem}>
        <Avatar source={{ uri: item?.avatar }} size={40} />
        <View style={styles.userInfo}>
          <Text className="text-primary font-pbold">{item.username}</Text>
        </View>
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
