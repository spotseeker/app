import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet} from "react-native";
import InfoBox from "@/components/InfoBox";
import Screen from '@/components/Screen';
import { Avatar } from '@kolking/react-native-avatar';
import Icons from "@/components/Icons";
import {Colors} from "@/constants/Colors"
import BackgroundImage from '@/assets/images_app/Rectangle 9 (1).png';
import ProfileImg from '@/assets/images_app/image_profile.png'
import { SafeAreaView } from 'react-native-safe-area-context';
 
const Profile = () => {
  const userData = {
    username: 'Ricardodlpj',
    fullName: 'Ricardo Jimenez',
    description: 'Estudiante de Ing. Informática | UCLA',
    followers: 3,
    following: 3,
    posts: 6,
    //profileImage: ProfileImg | uri|object
  };
  const { ArchiveIcon2,PostsIcon,StarIcon } = Icons;
  const textLight="text-lightc font-pbold text-[14px]"
  return (
    <SafeAreaView className=' h-full my-[-25]' style={{backgroundColor:'white'}}>
    <ScrollView>
    <View className="h-60 w-full my-[-80] absolute">
                <Image 
                  source={BackgroundImage} 
                  style={{ height: '100%', width: '100%'}} 
                  resizeMode="cover" // Mantiene la proporción de la imagen y cubre toda el área
                />
              </View>
      <Screen>
            <View className="flex justify-center w-full h-full mt-[-300] items-center " >
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <Avatar source={ProfileImg} color={Colors.text} radius={100} size={100} />
              </View>

                        {/* InfoBox */}
          <View style={{
                            marginTop: "5%", 
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
            </View>
              <View  className= 'left-[-2%]' style={styles.iconTabContainer}>
                <View style={styles.iconStyles}>
                    <PostsIcon size={40}/>
                    <Text className={textLight} style={{alignSelf:'center'}}>Publicaciones</Text>
                </View>
                <View className='left-[20%]'style={styles.iconStyles}>
                    <StarIcon size={40}/>
                    <Text  className={textLight} style={{alignSelf:'center'}}>Favoritas</Text>
                </View>
                <View className='right-[-30%]' style={styles.iconStyles}> 
                    <ArchiveIcon2 size={40}/>
                    <Text className={textLight} style={{alignSelf:'center'}}>Archivadas</Text>
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
    </SafeAreaView>

  );
}
export default Profile

const styles = StyleSheet.create({
  iconTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginTop: '-3%', 
    width:'100%',
    shadowColor: 'black',
    shadowRadius: 4,
    height:80,
    

  },
  iconStyles:{
    width:'33%', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems:'center'
  },
  avatarContainer:{
    marginTop:100,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  }

})


