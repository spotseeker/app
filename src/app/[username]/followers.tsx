import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from '@kolking/react-native-avatar'
import Screen from '@/src/components/Screen'

import Icons from '@/src/components/Icons'
import { router, useNavigation, Link, useLocalSearchParams } from 'expo-router'
import { Follower } from '@/src/types/user'
import { userListFollowers } from '@/src/hooks/useProfile'

const UserFollowers = () => {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  const { username } = useLocalSearchParams()
  const normalizedUsername = Array.isArray(username) ? username[0] : username
  const { followers } = userListFollowers(1, normalizedUsername)
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
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const renderFollower = ({ item }: { item: Follower }) => (
    <Link href={`/profile/${item.username}`} asChild>
      <View style={styles.followerItem}>
        <Avatar source={{ uri: item?.avatar }} size={40} />
        <Text className="text-primary font-pbold ml-[10]">{item.username}</Text>
      </View>
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
