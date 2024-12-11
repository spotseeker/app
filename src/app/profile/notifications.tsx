import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from '@kolking/react-native-avatar'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import Img1 from '@/src/assets/images_app/avatar_users/Ellipse 11.png'
import Img2 from '@/src/assets/images_app/avatar_users/Ellipse 14.png'
import Img3 from '@/src/assets/images_app/avatar_users/Ellipse 14 (1).png'

type Notification = {
  id: string
  username: string
  uri: ImageSourcePropType
  interaction: string
  date: Date
}

const NotificationsScreen = () => {
  const { ArrowBack, TrashIcon } = Icons
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      gestureEnabled: false,
      title: '',
      headerTitle: 'Notificaciones',
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      username: 'Andresjpg',
      uri: Img1,
      interaction: 'le dio like a tu publicación',
      date: new Date('2024-11-01')
    },
    {
      id: '2',
      username: 'Yohanna33',
      uri: Img2,
      interaction: 'comentó en tu publicación',
      date: new Date('2024-10-28')
    },
    {
      id: '3',
      username: 'Davidbqto',
      uri: Img3,
      interaction: 'te empezó a seguir',
      date: new Date('2024-10-20')
    }
  ])

  const removeNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((item) => item.id !== id)
    )
  }

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <Avatar source={item.uri} size={40} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.username}</Text> {item.interaction}
        </Text>
        <Text style={styles.notificationDate}>{item.date.toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => removeNotification(item.id)}>
        <TrashIcon size={20} color="#999" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        style={styles.notificationList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  notificationList: {
    paddingVertical: 20
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginVertical: 5
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10
  },
  notificationText: {
    fontSize: 14,
    color: '#333'
  },
  username: {
    fontWeight: 'bold',
    color: '#000'
  },
  notificationDate: {
    fontSize: 12,
    color: '#999'
  }
})

export default NotificationsScreen
