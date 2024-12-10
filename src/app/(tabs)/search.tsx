import Icons from '@/src/components/Icons'
import SearchInput from '@/src/components/SearchInput'
import { router, useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ImageGrid from '@/src/components/ImageGrid'
import { images } from '@/src/fixtures/images'

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
  const imagesFiltered = images.filter((image) =>
    image.alt.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex justify-center items-center ">
        <SearchInput
          placeholder="Buscar usuarios, lugares o publicaciones"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <View className="flex justify-center items-center">
        <FlatList
          numColumns={3}
          renderItem={ImageGrid}
          data={imagesFiltered}
          keyExtractor={(item) => item.url}
        />
      </View>
    </SafeAreaView>
  )
}
