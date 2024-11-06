import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native'
import InfoBox from '@/src/components/InfoBox'
import Screen from '@/src/components/Screen'
import { Avatar } from '@kolking/react-native-avatar'
import Icons from '@/src/components/Icons'
import { Colors } from '@/src/constants/Colors'
import BackgroundImage from '@/src/assets/images_app/Rectangle 9 (1).png'
import ProfileImg from '@/src/assets/images_app/avatar_users/Ellipse 14.png'
import { post } from '@/src/fixtures/post'
import PostCard from '@/src/components/PostCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useNavigation } from 'expo-router'
import Button from '@/src/components/Button'

const Profile = () => {
  const userData = {
    id: 'Abb234',
    username: 'AndresUcla',
    fullName: 'Andrés Alvarez',
    description: 'Estudiante de Ing. Informática',
    followers: 3,
    following: 3,
    posts: 3
  }
  const { ArrowBack } = Icons
  const [isFollowing, setIsFollowing] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitle: userData.username,
      headerTintColor: '#FB9062',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRightContainerStyle: {
        marginRight: '9%',
        paddingRight: '10%'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev)
  }

  const renderHeader = () => (
    <View style={{ height: 500 }}>
      <View className="h-60 w-full my-[-20%] absolute">
        <Image
          source={BackgroundImage}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
        />
      </View>
      <Screen>
        <View className="flex justify-center w-full h-full mt-[-40%] items-center">
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Avatar source={ProfileImg} color={Colors.text} radius={100} size={100} />
          </View>

          {/* InfoBox */}
          <View style={{ marginTop: '5%', marginLeft: '5%' }}>
            <InfoBox
              title={userData.username}
              subtitle={userData.fullName}
              info={userData.description}
              containerStyles={{
                padding: 16,
                backgroundColor: 'transparent',
                borderRadius: 0
              }}
              titleStyles={{ fontSize: 18 }}
              followers={userData.followers}
              following={userData.following}
              posts={userData.posts}
            />
          </View>

          {/* Botón de Seguir/Dejar de seguir */}
          <View style={styles.iconTabContainer}>
            <Button
              onPress={toggleFollow}
              variant={isFollowing ? 'gray' : 'primary'}
              width={150}
              height={47}
            >
              <Text className="text-white font-pbold">
                {isFollowing ? 'Dejar de seguir' : 'Seguir'}
              </Text>
            </Button>
          </View>

          {/* Línea divisoria */}
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
        </View>
      </Screen>
    </View>
  )

  return (
    <SafeAreaView
      edges={['bottom']}
      className="h-full"
      style={{ backgroundColor: 'white' }}
    >
      {/* FlatList con encabezado y lista de posts */}
      <FlatList
        ListHeaderComponent={renderHeader}
        data={post.filter((item) => item.userid === userData.id)}
        renderItem={({ item }) => (
          <PostCard
            location={item.location}
            image={item.image}
            user={item.user}
            date={item.date}
            description={item.description}
            isOwnProfile={false}
            rating={item.rating}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  iconTabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '-5%',
    width: '100%',
    height: 60
  },
  avatarContainer: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden'
  }
})
