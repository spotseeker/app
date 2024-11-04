import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PostCardList from '@/src/components/PostCardList'
import Icons from '@/src/components/Icons'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function Home() {
  const { LogoNomIcon } = Icons
  return (
    <SafeAreaView>
      <View className="mt-[-10]">
        <View className=" bg-white flex-row  p-5 my-5">
          <LogoNomIcon width={200} height={30} mr={29} />
          <AntDesign name="bells" size={28} style={styles.iconbells}></AntDesign>
        </View>
        <View className="mt-[-32]">
          <PostCardList />
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  iconbells: {
    marginLeft: 'auto',
    marginRight: 7,
    marginTop: 1
  }
})
