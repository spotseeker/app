import React from 'react'
import { Tabs } from 'expo-router'
import Icons from '@/src/components/Icons'
import { Avatar } from '@kolking/react-native-avatar'
import { Colors } from '@/src/constants/Colors'
import ProfileImg from '@/src/assets/images_app/image_profile.png'

export default function TabLayout() {
  const { SearchIcon, HomeIcon, PlusIcon, MapMarkerIcon } = Icons
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarActiveTintColor: '#EE5D6C',
        tabBarStyle: {
          paddingBottom: 10,
          height: 90,
          borderColor: '#EE5D6C',
          borderTopWidth: 3.5
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={38} />
        }}
      />

      <Tabs.Screen
        name="MapView"
        options={{
          headerShown: false,
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <MapMarkerIcon color={color} size={38} />
        }}
      />

      <Tabs.Screen
        name="CreatePost"
        options={{
          headerShown: false,
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <PlusIcon color={color} size={38} />
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <SearchIcon color={color} size={38} />
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Avatar source={ProfileImg} color={color} radius={50} size={50} />
          )
        }}
      />
    </Tabs>
  )
}
