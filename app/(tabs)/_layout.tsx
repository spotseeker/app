import React from 'react';
import { Tabs } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icons from "@/components/Icons";
import { Avatar } from '@kolking/react-native-avatar';
import {Colors} from '@/constants/Colors'



  function TabLayout() {
  const  {SearchIcon} = Icons;
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: Colors.tabIconSelected,
        headerShown: false,
      tabBarStyle: {
        paddingBottom: 10,
        height: 90,
        borderColor:'#EE5D6C',
        borderTopWidth:1.5
      },
    }}
  
      >
        <Tabs.Screen
        name="Search"
        options={{
          title: '',
          tabBarIcon: ({ color,size }) => <SearchIcon color={color} size={size} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Avatar color={color} radius={35} size={35}/>,
        }}
      />


    </Tabs>
  );
} 
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome" 
        component={TabLayout} 
        options={{ headerShown: true, title: 'Mi perfil' }} // Customize header options here
      />

    </Stack.Navigator>
  );
}
export default HomeStack