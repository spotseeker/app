import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import * as Location from 'expo-location'
import SearchInput from '@/src/components/SearchInput'

const { MapMarkerColorIcon, ArrowBack } = Icons
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

export default function Map() {
  const navigation = useNavigation()
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const requestLocationPermission = async () => {
      setLoading(true)
      const timeout = setTimeout(() => {
        Alert.alert(
          'Tiempo de espera agotado',
          'No se pudo obtener la ubicación. Usando ubicación predeterminada.'
        )
        setLocation({
          latitude: 10.066648,
          longitude: -69.362973
        })
        setLoading(false)
      }, 10000) // Tiempo de espera de 10 segundos

      try {
        const servicesEnabled = await Location.hasServicesEnabledAsync()
        if (!servicesEnabled) {
          Alert.alert(
            'Servicios de ubicación deshabilitados',
            'Activa los servicios de ubicación en tu dispositivo.'
          )
          clearTimeout(timeout)
          return
        }

        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert(
            'Permiso denegado',
            'Se necesita acceso a la ubicación para usar esta función.'
          )
          setLocation({
            latitude: 10.066648,
            longitude: -69.362973
          })
          clearTimeout(timeout)
        } else {
          const currentLocation = await Location.getCurrentPositionAsync({})
          setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
          })
          clearTimeout(timeout)
        }
      } catch (error) {
        console.log(error)
        Alert.alert(
          'Error al obtener la ubicación',
          'Hubo un problema al intentar obtener tu ubicación.'
        )
        setLocation({
          latitude: 10.066648,
          longitude: -69.362973
        })
        clearTimeout(timeout)
      }
      setLoading(false)
    }

    requestLocationPermission()
  }, [])
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
  if (loading || location === null) {
    return (
      <View
        style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
      >
        <ActivityIndicator size="large" color="#FB9062" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        <Marker
          title="SpotSeeker"
          description="Marker custom"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
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
