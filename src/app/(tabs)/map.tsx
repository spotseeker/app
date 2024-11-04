import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import SearchInput from '@/src/components/SearchInput'

const { MapMarkerColorIcon, ArrowBack } = Icons
let latitude: number
let longitude: number
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 60000
})
  .then((location) => {
    console.log(location)
    latitude = location.latitude
    longitude = location.longitude
  })
  .catch((error) => {
    const { code, message } = error
    console.warn(code, message)
    latitude = 10.066648
    longitude = -69.362973
  })

export default function Map() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Mapa',
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
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        <Marker
          title="SpotSeeker"
          description="Marker custom"
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}
        >
          <MapMarkerColorIcon size={50} />
        </Marker>
      </MapView>
      <View style={{ position: 'absolute', top: 0 }}>
        <SearchInput
          placeholder="Buscar lugares nuevos"
          value={query}
          onChangeText={setQuery}
        />
      </View>
    </View>
  )
}
