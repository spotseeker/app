import Icons from '@/src/components/Icons';
import Input from '@/src/components/Input';
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SearchSchema } from '@/src/schemas/SearchSchema';
import ImageGrid from '@/src/components/ImageGrid';
import { images } from '@/src/fixtures/images';

export default function Search() {
  const { ArrowBack } = Icons
  const { control } = useForm({
    resolver: zodResolver(SearchSchema)
  })
  const navigation = useNavigation();
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
      ),
    })
  }, [navigation])
  return (
    <SafeAreaView>
      <View className='flex justify-center items-center'>
        <Input
            placeholder='Buscar usuarios, lugare o publicaciones'
            variant='search'
            name='search'
            control={control}
        />
      </View>
      <View className='flex justify-center items-center'>
        <FlatList
          numColumns={3}
          renderItem={ImageGrid}
          data={images}
          keyExtractor={(item) => item.url}
        />
      </View>
    </SafeAreaView>
  )
}
