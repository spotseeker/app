import React from 'react';
import {Tabs } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icons from "@/components/Icons";
import { Avatar } from '@kolking/react-native-avatar';
import {Colors} from '@/constants/Colors'
import { TouchableOpacity } from 'react-native';
import ProfileImg from '@/assets/images_app/image_profile.png'
const Stack = createNativeStackNavigator();

  function TabLayout() {
  const  {SearchIcon,HomeIcon,PlusIcon,MapMarkerIcon} = Icons;
  return (
    <Tabs screenOptions={{headerShown:false,
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor:Colors.tabIconSelected,
        tabBarStyle: {
        paddingBottom: 10,
        height: 90,
        borderColor:'#EE5D6C',
        borderTopWidth:3.5
      },
    }}
  
      >
        <Tabs.Screen
        name="Home"
        options={{headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <HomeIcon color={color}  size={35}/>,
        }}
      />
        <Tabs.Screen
        name="MapView"
        options={{headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <MapMarkerIcon color={color}  size={35}/>,
        }}
      />

       <Tabs.Screen
        name="post"
        options={{ headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <PlusIcon color={color}  size={35}/>,
        }}
      />

        <Tabs.Screen
        name="Search"
        options={{ headerShown:false,
          title: '',
          tabBarIcon: ({ color,size=50}) => <SearchIcon color={color} size={size} />,
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{ headerShown:false,
          title: '',
          tabBarIcon: ({ color }) => <Avatar source={ProfileImg} color={color} radius={35} size={35}/>,
        }}
      />

     

    </Tabs>
  );
} 

function HomeStack() {

  const {MenuIcon,ArrowBack}=Icons
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="profile" 
        component={TabLayout}
        options={{
          headerShown: true, // Mostrar encabezado solo si estamos en la pantalla de perfil
          title: '  Mi perfil',
          headerTintColor: '#FB9062',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <MenuIcon size={35} />
          ),
          headerLeft: () => (
            <TouchableOpacity>
              <ArrowBack size={35} />
            </TouchableOpacity>
          ),
        }}
      />



    </Stack.Navigator>
  );
}
export default HomeStack