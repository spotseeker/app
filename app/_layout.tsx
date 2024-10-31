/* eslint-disable @typescript-eslint/no-require-imports */
import { SplashScreen, Stack,router} from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Icons from "@/components/Icons";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const {ArrowBack} =Icons
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" options={{ headerShown: true,
       title: '',
       headerTitle:'Configuracion',
       headerTintColor: '#EEAF61',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       headerLeft: () => (
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      ),

       }} />
      <Stack.Screen name="Update-password" options={{ headerShown: true, title: '',
       headerTitle:'Cambio de  Contraseña',
       headerTintColor: '#EEAF61',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       headerLeft: () => (
        <TouchableOpacity onPress={() => router.push("/Settings")}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      ),
 }} />
      <Stack.Screen name="EditProfile" options={{ headerShown: true, title: '',
       headerTitle:'Editar Perfil',
       headerTintColor: '#EEAF61',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       headerLeft: () => (
        <TouchableOpacity onPress={() => router.push("/Settings")}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      ),
 }} />

      <Stack.Screen name="userStats/UserFollowers" options={{ headerShown: true, title: '',
       headerTitle:'Seguidores',
       headerTintColor: '#EEAF61',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       headerLeft: () => (
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      ),
 }} />
     
     <Stack.Screen name="userStats/UserFollowing" options={{ headerShown: true, title: '',
       headerTitle:'Siguiendo',
       headerTintColor: '#EEAF61',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
       headerLeft: () => (
        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      ),
 }} />



      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
