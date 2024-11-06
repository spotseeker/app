import React from 'react'
import { Tabs } from 'expo-router'
import Icons from '@/src/components/Icons'
import { Avatar } from '@kolking/react-native-avatar'
import { Colors } from '@/src/constants/Colors'
import ProfileImg from '@/src/assets/images_app/image_profile.png'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function TabLayout() {
  const { SearchIcon, HomeIcon, PlusIcon, MapMarkerIcon, LogoNomIcon } = Icons
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
        name="home"
        options={{
          headerShown: true,
          title: '',
          tabBarShowLabel: false,
          headerShadowVisible: true,
          headerStyle: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5
          },
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={38} />,
          headerLeft: () => <LogoNomIcon width={200} height={30} mr={10} />,
          headerRight: () => (
            <AntDesign
              name="bells"
              size={28}
              style={{
                marginLeft: 'auto',
                marginRight: 7,
                marginTop: 1
              }}
            />
          )
        }}
      />

      <Tabs.Screen
        name="map"
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
        name="profile"
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
