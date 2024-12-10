import Icons from '@/src/components/Icons'
import SearchInput from '@/src/components/SearchInput'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDiscover, useSearch } from '@/src/hooks/usePost'
import { PostResponse } from '@/src/types/post'
import ImageGridList from '@/src/components/ImageGridList'

export default function Search() {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Búsqueda',
      headerTintColor: '#FB9062',
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
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<PostResponse>()
  const [discoverPosts, setDiscoverPosts] = useState<PostResponse>()
  const { results, isLoading } = useSearch(1, query)
  const { discover } = useDiscover(1)

  useEffect(() => {
    if (query != '' && results) {
      setPosts(results)
      setDiscoverPosts(undefined)
    } else {
      setPosts(undefined)
      setDiscoverPosts(discover)
    }
  }, [results])

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex justify-center items-center ">
        <SearchInput
          placeholder="Buscar usuarios, lugares o publicaciones"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <ImageGridList
        isLoading={isLoading}
        posts={posts?.results}
        discoverPosts={discoverPosts?.results}
      />
    </SafeAreaView>
  )
}
