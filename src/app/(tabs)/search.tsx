import Icons from '@/src/components/Icons'
import SearchInput from '@/src/components/SearchInput'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/src/fixtures/images'
import { useSearch } from '@/src/hooks/usePost'
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
  const { results, isLoading } = useSearch(1, query)
  useEffect(() => {
    if (query === '') {
      setPosts(images)
    } else {
      setPosts(results)
    }
  }, [query])

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex justify-center items-center mt-[-10%]">
        <SearchInput
          placeholder="Buscar usuarios, lugares o publicaciones"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <ImageGridList isLoading={isLoading} posts={posts?.results} />
    </SafeAreaView>
  )
}
