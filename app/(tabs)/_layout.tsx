import React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { Tabs, router } from 'expo-router';
import Icons from "@/components/Icons";
import { Avatar } from '@kolking/react-native-avatar';
import {Colors} from '@/constants/Colors'
import ProfileImg from '@/assets/images_app/image_profile.png'


 export default function TabLayout() {
 const { SearchIcon, HomeIcon, PlusIcon, MapMarkerIcon, FourLinesIcon, ArrowBack} = Icons;
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarInactiveTintColor:Colors.tabIconDefault,
      tabBarActiveTintColor:'#EE5D6C',
      tabBarStyle: {
      paddingBottom: 10,
      height: 90,
      borderColor:'#EE5D6C',
      borderTopWidth:3.5
      },
    }}
    >
      <Tabs.Screen name='Home'
      options={{
        headerShown: false,
        title: '',
        tabBarIcon: ({ color }) => <HomeIcon color={color}  size={38}/>,
      }}
    />

       <Tabs.Screen
        name="MapView"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <MapMarkerIcon color={color}  size={38}/>,
        }}
      />


       <Tabs.Screen
        name="CreatePost"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <PlusIcon color={color}  size={38}/>,
        }}
      />

       <Tabs.Screen
        name="Search"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color}) => <SearchIcon color={color} size={38} />,
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: true,
          title: '',
          headerTitle:'Mi perfil',
          headerTintColor: '#FB9062',
          headerRightContainerStyle:{
          marginRight:'9%',
          paddingRight:'10%',
          
          },
          headerTitleStyle: {
          fontWeight: 'bold',
          },
          headerRight: () => (
            <Pressable  onPress={() => router.push("/Settings")}>
            <FourLinesIcon size={35} />
            </Pressable>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
              <ArrowBack size={35} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <Avatar source={ProfileImg} color={color} radius={50} size={50}/>,
        }}
      />

    </Tabs>
  );
}
