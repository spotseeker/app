import { Text, View, Image } from 'react-native';
import React from 'react';
import logo from '../assets/images_app/modelo_logo_icon_V.2..4.png'
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image 
        className='mr-5'
        source={logo}

      />
      
      <Text>Donde tus destinos cobran vida..</Text>
    </View>
  );
}

