import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from '@kolking/react-native-avatar'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import { useNotificationsList } from '@/src/hooks/useUserData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NotificacionResponse, Result } from '@/src/types/user'

const NotificationsScreen = () => {
  const { ArrowBack } = Icons
  const navigation = useNavigation()
  const [userName, setUserName] = useState<string | undefined>()
  const [showMessage, setShowMessage] = useState('')
  const [notifications, setNotifications] = useState<NotificacionResponse>()

  useEffect(() => {
    const response = async () => {
      const data = await AsyncStorage.getItem('username')
      if (data!) {
        setUserName(data)
      }
    }

    response()
  }, [userName])

  console.log(userName)
  const { notificationsList } = useNotificationsList(1, userName as string)

  useEffect(() => {
    if (notificationsList?.results.length === 0) {
      setShowMessage('No tienes notificaciones')
    }
    if (notificationsList && userName) {
      console.log(notificationsList)
      setNotifications(notificationsList)
    }
  }, [notificationsList, userName])

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

  const renderNotification = ({ item }: { item: Result }) => (
    <View style={styles.notificationItem}>
      <Avatar source={{ uri: item.userInteraction.avatar }} size={40} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.userInteraction.username}</Text>{' '}
          {item.content}
        </Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-white">
      <Text>{showMessage}</Text>
      <FlatList
        data={notifications?.results}
        keyExtractor={(item, index) => index.toString()}
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
