import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MapView() {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-lightc font-pbold text-[14px]">Vista del Mapa</Text>
      </View>
    </SafeAreaView>
  )
}
