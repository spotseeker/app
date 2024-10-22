import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfile from './UserProfile'
//import Settings from './Settings';
import Icons from '@/components/Icons';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
// Define el tipo para el stack navigator
type RootStackParamList = {
  Settings: undefined; // Define las rutas y sus parámetros
  UserProfile: undefined; //{ itemId: number }; //ruta dinamica 
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
 const {MenuIcon,ArrowBack}=Icons
  return (
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} 
        options={{
            headerShown:true, 
            title: '  Mi perfil',
            headerTintColor: '#FB9062',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <MenuIcon size={35} />
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
                <ArrowBack size={35} />
              </TouchableOpacity>
            ),
          }}/>
      </Stack.Navigator>
  );
}