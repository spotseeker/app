import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import GetLocation from 'react-native-get-location'

let latitude: number
let longitude: number
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 60000,
})
.then(location => {
  console.log(location);
  latitude = location.latitude
  longitude = location.longitude
})
.catch(error => {
  const { code, message } = error;
  console.warn(code, message);
  latitude = 10.066648
  longitude = -69.362973

})

export default () => (
  <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE}
       style={styles.map}
       region={{
         latitude: latitude,
         longitude: longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
  </View>
);
