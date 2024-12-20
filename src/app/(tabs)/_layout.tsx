import React, { useEffect } from 'react'
import { View, StyleSheet, BackHandler } from 'react-native'
import { router, Tabs } from 'expo-router'
import Icons from '@/src/components/Icons'
import { Colors } from '@/src/constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Pressable } from 'react-native'
import { Avatar } from '@kolking/react-native-avatar'
import { useAuthContext } from '@/src/context/context'
import { useUserProfile } from '@/src/hooks/useProfile'

export default function TabLayout() {
  const { SearchIcon, HomeIcon, PlusIcon, MapMarkerIcon, LogoNomIcon } = Icons
  const { myUsername } = useAuthContext()
  const { profile } = useUserProfile(myUsername)

  useEffect(() => {
    const onBackPress = () => {
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => backHandler.remove()
  }, [])

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: Colors.tabIconDefault,
          tabBarActiveTintColor: '#EE5D6C',
          tabBarStyle: {
            height: 55,
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
            tabBarIcon: ({ color }) => <HomeIcon color={color} size={30} />,
            headerLeft: () => <LogoNomIcon width={200} height={30} mr={10} />,
            headerRight: () => (
              <Pressable onPress={() => router.push('/profile/notifications')}>
                <AntDesign
                  name="bells"
                  size={28}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 7,
                    marginTop: 1
                  }}
                />
              </Pressable>
            )
          }}
        />

        <Tabs.Screen
          name="map"
          options={{
            headerShown: false,
            title: '',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <MapMarkerIcon color={color} size={30} />
          }}
        />

        <Tabs.Screen
          name="post"
          options={{
            headerShown: false,
            title: '',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <PlusIcon color={color} size={30} />
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: '',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <SearchIcon color={color} padding={0} size={30} />
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: '',
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <Avatar
                source={profile?.avatar ? { uri: profile.avatar } : undefined}
                color={color}
                radius={50}
                size={50}
              />
            )
          }}
        />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
