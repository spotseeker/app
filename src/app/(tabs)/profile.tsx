import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable
} from 'react-native'
import InfoBox from '@/src/components/InfoBox'
import Screen from '@/src/components/Screen'
import { Avatar } from '@kolking/react-native-avatar'
import Icons from '@/src/components/Icons'
import { Colors } from '@/src/constants/Colors'
import BackgroundImage from '@/src/assets/images_app/Rectangle 9 (1).png'
import ProfileImg from '@/src/assets/images_app/image_profile.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useNavigation } from 'expo-router'
import { usePostsUser, usePostsArchived, usePostsBookmarked } from '@/src/hooks/usePost'
import PostCard from '@/src/components/PostCard'
import { PostResponse } from '@/src/types/post'

const Profile = () => {
  const userData = {
    id: 'Abc234',
    username: 'andres1',
    fullName: 'Ricardo Jimenez',
    description: 'Estudiante de Ing. Informática | UCLA',
    followers: 3,
    following: 3,
    posts: 6
  }
  const { ArchiveIcon2, PostsIcon, StarIcon, FourLinesIcon, ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitle: 'Mi Perfil',
      headerTintColor: '#FB9062',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRightContainerStyle: {
        marginRight: '9%',
        paddingRight: '10%'
      },
      headerRight: () => (
        <Pressable onPress={() => router.replace('/profile/settings')}>
          <FourLinesIcon size={35} />
        </Pressable>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  const [currentTypePost, setCurrentTypePost] = useState<string>('all')
  const [posts, setPosts] = useState<PostResponse>()
  const userPosts = usePostsUser(1, userData.username)
  const archivedPosts = usePostsArchived(1)
  const bookmarkedPosts = usePostsBookmarked(1)

  useEffect(() => {
    if (currentTypePost === 'all') {
      if (userPosts) {
        setPosts(userPosts.posts)
      }
    } else if (currentTypePost === 'favorites') {
      if (bookmarkedPosts) {
        setPosts(bookmarkedPosts.posts)
      }
    } else if (currentTypePost === 'archived') {
      if (archivedPosts) {
        setPosts(archivedPosts.posts)
      }
    }
  }, [currentTypePost, userPosts, bookmarkedPosts, archivedPosts])

  const handlePostButton = (type: string) => {
    setCurrentTypePost(type)
  }
  const textLight = 'text-lightc font-pbold text-[14px]'
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

          {/* Iconos de opciones */}
          <View className="left-[2%]" style={styles.iconTabContainer}>
            <TouchableOpacity
              style={{ height: '100%', width: '33%' }}
              onPress={() => {
                handlePostButton('all')
              }}
            >
              <View style={styles.iconStyles}>
                <PostsIcon size={40} />
                <Text className={textLight} style={{ alignSelf: 'center' }}>
                  Publicaciones
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ height: '100%', width: '33%' }}
              onPress={() => {
                handlePostButton('favorites')
              }}
            >
              <View style={styles.iconStyles}>
                <StarIcon size={40} />
                <Text className={textLight} style={{ alignSelf: 'center' }}>
                  Favoritas
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ height: '100%', width: '33%' }}
              onPress={() => {
                handlePostButton('archived')
              }}
            >
              <View style={styles.iconStyles}>
                <ArchiveIcon2 size={40} />
                <Text className={textLight} style={{ alignSelf: 'center' }}>
                  Archivadas
                </Text>
              </View>
            </TouchableOpacity>
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
      className="h-full "
      style={{ backgroundColor: 'white' }}
    >
      {/* FlatList con encabezado y lista de posts */}
      <FlatList
        ListHeaderComponent={renderHeader}
        data={posts?.results}
        renderItem={({ item }) => (
          <PostCard
            locationId={item.locationId}
            images={item.images}
            user={item.user}
            createdAt={item.createdAt}
            body={item.body}
            score={item.score}
            id={item.id}
            isArchived={item.isArchived}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  iconTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '-5%',
    width: '100%',
    shadowColor: 'black',
    shadowRadius: 4,
    height: 80
  },
  iconStyles: {
    marginLeft: -13,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -5
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
