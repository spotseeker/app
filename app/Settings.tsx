import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Screen from "@/components/Screen";
import Icons from '@/components/Icons';
import { router } from 'expo-router';
import ModalAction from '@/components/ModalAction';

export default function Settings() {
  const { ArrowIcon, LogOutIcon } = Icons;
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogOutPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmLogOut = () => {
    setModalVisible(false);
    router.push('/(auth)/Sign-in');
  };

  const handleUpdatePassword = () => {
    setModalVisible(false);
    router.push('/Update-password');
  };

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}>
        <Screen>
          <View className="justify-start items-center my-[-109%] ">
            
            {/* Opción de editar perfil */}
            <View className='w-full flex-row items-center justify-between px-4 mb-4'>
              <Text className='font-pbold text-helper text-[18px]'>Editar mi perfil</Text>
              <View className="mr-2">
                <ArrowIcon size={24} />
              </View>
            </View>

            {/* Opción de cambiar contraseña */}
            <TouchableOpacity  onPress={handleUpdatePassword}>
             <View className='w-full flex-row items-center justify-between px-4 mb-4 my-[58]'>
              
               <Text className='font-pbold text-helper text-[18px]'>Cambiar contraseña</Text>
                <View className='mr-2'>
                  <ArrowIcon size={24} />
                </View>
              </View>
            </TouchableOpacity>
            
            {/* Opción de cerrar sesión con el ícono de LogOut */}
            <TouchableOpacity onPress={handleLogOutPress}>
             <View className='w-full flex-row items-center justify-between px-6 mb-2 mt-[50]'>
               <Text className='font-pbold text-complementaryB text-[18px] mx-[-2%]'>Cerrar sesión</Text>
              
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
  );
}