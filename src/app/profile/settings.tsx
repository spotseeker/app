import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Screen from '@/src/components/Screen'
import Icons from '@/src/components/Icons'
import { router, useNavigation } from 'expo-router'
import ModalAction from '@/src/components/ModalAction'

export default function Settings() {
  const { ArrowIcon, LogOutIcon, ArrowBack } = Icons
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitle: 'Configuracion',
      headerTintColor: '#EEAF61',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <ArrowBack size={35} />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  const [isModalVisible, setModalVisible] = useState(false)

  const handleLogOutPress = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleConfirmLogOut = async () => {
    // await AsyncStorage.clear();
    setModalVisible(false)
    router.push('/auth/login')
  }

  const handleUpdatePassword = () => {
    setModalVisible(false)
    router.replace('/profile/password')
  }

  const handleEditProfile = () => {
    setModalVisible(false)
    router.replace('/profile/edit')
  }

  return (
    <SafeAreaView edges={['bottom']} className="h-full bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingTop: Dimensions.get('window').height * 0.1,
          paddingBottom: 20,
          marginTop: Dimensions.get('window').height * -0.1
        }}
      >
        <Screen>
          <View className="justify-start items-center my-[-90%] ">
            {/* Opción de editar perfil */}
            <TouchableOpacity onPress={handleEditProfile}>
              <View className="w-full flex-row items-center justify-between px-4 mb-4">
                <Text className="font-pbold text-helper text-[18px]">
                  Editar mi perfil
                </Text>
                <View className="mr-2">
                  <ArrowIcon size={24} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Opción de cambiar contraseña */}
            <TouchableOpacity onPress={handleUpdatePassword}>
              <View className="w-full flex-row items-center justify-between px-4 mb-4 my-[58]">
                <Text className="font-pbold text-helper text-[18px]">
                  Cambiar contraseña
                </Text>
                <View className="mr-2">
                  <ArrowIcon size={24} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Opción de cerrar sesión con el ícono de LogOut */}
            <TouchableOpacity onPress={handleLogOutPress}>
              <View className="w-full flex-row items-center justify-between px-6 mb-2 mt-[50]">
                <Text className="font-pbold text-complementaryB text-[18px] mx-[-2%]">
                  Cerrar sesión
                </Text>

                <LogOutIcon size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </Screen>

        {/* Modal de confirmación */}
        <ModalAction
          action="confirmation"
          visible={isModalVisible}
          onClose={handleCloseModal}
          message="¿Estás seguro de que deseas cerrar sesión?"
          onConfirm={handleConfirmLogOut}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
