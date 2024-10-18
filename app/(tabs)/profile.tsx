import React from 'react';
import { View, Text, Image, ScrollView} from "react-native";
import Screen from "@/components/Screen";
import InfoBox from "@/components/InfoBox";
import { Avatar } from '@kolking/react-native-avatar';
import Icons from "@/components/Icons";
import {Colors} from "@/constants/Colors"
import BackgroundImage from '@/assets/images_app/Rectangle 9 (1).png';
import ProfileImg from '@/assets/images_app/image_profile.png'


 type UserTypes = {
  userData: {
    username: string;
    fullName: string;
    description: string;
    followers: number;
    following: number;
    posts: number;
    profileImage: object;
  };
}
const Profile: React.FC<UserTypes> = () => {
  const userData = {
    username: 'Ricardodlpj',
    fullName: 'Ricardo Jimenez',
    description: 'Estudiante de Ing. Informática | UCLA',
    followers: 150,
    following: 200,
    posts: 34,
    //profileImage: ProfileImg | uri|object
  };
  const { ArchiveIcon,PostsIcon,StarIcon } = Icons;
  const textLight="text-lightc font-pbold text-[14px]"
  return (
     <ScrollView contentContainerStyle={{paddingBottom: '-50%'}}>
        {/* Imagen de fondo con altura controlada */}
      <View className="h-60 w-full absolute">
        <Image 
          source={BackgroundImage} 
          style={{ height: '100%', width: '100%' }} 
          resizeMode="cover" // Mantiene la proporción de la imagen y cubre toda el área
        />
      </View>
        <Screen>

          <View className="text-lightc font-pbold text-[17px]" style={{ alignItems: 'center', marginTop:'10%' }}>
            {/* Avatar */}
            <View style={{
              borderWidth: 5,
              borderColor: 'white',
              borderRadius: 80,
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              overflow: 'hidden',
            }}>
              <Avatar source={ProfileImg} color={Colors.text} radius={80} size={80} />
            </View>

                      {/* InfoBox */}
        <View style={{
                          marginTop: "2%", 
                      }}>
              <InfoBox
                title={userData.username}
                subtitle={userData.fullName}
                info={userData.description}
                containerStyles={{ padding: 16, backgroundColor: 'transparent', borderRadius: 0}}
                titleStyles={{ fontSize: 18 }} 
                followers={userData.followers} 
                following={userData.following} 
                posts={userData.posts}
                />
            <View style={{ 
              flexDirection: 'row',
              justifyContent: 'space-around', 
              marginTop: '-10%', 
              width: '100%',
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
               }}>
              <View style={{
                width:'33%', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 10, justifyContent: 'center', 
                alignItems:'center'
                }}>
                  <PostsIcon size={40}/>
                  <Text className={textLight} style={{alignSelf:'center'}}>Todas</Text>
              </View>
              <View style={{width:'33%', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems:'center'}}>
                  <StarIcon size={40}/>
                  <Text  className={textLight} style={{alignSelf:'center'}}>Favoritas</Text>
              </View>
              <View style={{width:'33%', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems:'center'}}> 
                  <ArchiveIcon size={40}/>
                  <Text className={textLight} style={{alignSelf:'center'}}>Archivadas</Text>
              </View>

            </View>
                  
            </View>
            <View
            style={{
                height: 1,
                width: '200%', 
                marginLeft:'-20%',
                backgroundColor: '#cccc', 
                elevation: 5, 
                marginVertical: 20, // Espaciado vertical (Aplica en android ver doc)
              }} >
           
            </View>
          </View>
        </Screen>
      </ScrollView>

  );
}
export default Profile


