import React, {useState, useEffect} from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import InfoBox from "@/components/InfoBox";
import Screen from '@/components/Screen';
import { Avatar } from '@kolking/react-native-avatar';
import {post} from '@/scripts/post';
import PostCard from '@/components/PostCard';
import Icons from "@/components/Icons";
import { Colors } from "@/constants/Colors";
import BackgroundImage from '@/assets/images_app/Rectangle 9 (1).png';
import ProfileImg from '@/assets/images_app/avatar_users/image_profile.png';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const userData = {
    id:'Abc234',
    username: 'Ricardodlpj',
    fullName: 'Ricardo Jimenez',
    description: 'Estudiante de Ing. Informática | UCLA',
    followers: 3,
    following: 3,
    posts: 6,
  };

  const [currentTypePost, setCurrentTypePost] = useState<string>('')
  const [filterPosts,setFilterPost] = useState(post)

  useEffect(() => {
    const filteredPosts = post.filter(post => {
        if (currentTypePost === 'all') {
            return post &&  post.isArchive == false && post.userid == userData.id; 
        } else if (currentTypePost === 'favorites') {
            return post.isFavorite == true && post.userid == userData.id;  
        } else if (currentTypePost === 'archived') {
            return post.isArchive === true && post.userid == userData.id; 
        } 
    });

    setFilterPost(filteredPosts);
}, [currentTypePost]);

  const handlePostButton = (type: string) => {
    setCurrentTypePost(type)
  }

  const {ArchiveIcon2,PostsIcon, StarIcon } = Icons;
  const textLight = "text-lightc font-pbold text-[14px]";

  // Encabezado que contiene la información del perfil
  const renderHeader = () => (
    <View style={{height: 500}}>
      <View className="h-60 w-full my-[-20%] absolute">
        <Image
          source={BackgroundImage}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
        />
      </View>
      <Screen>
        <View className="flex justify-center w-full h-full mt-[-40%] items-center">
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Avatar source={ProfileImg} color={Colors.text} radius={100} size={100} />
          </View>

          {/* InfoBox */}
          <View style={{ marginTop: '5%', marginLeft: '5%' }}>
            <InfoBox
              title={userData.username}
              subtitle={userData.fullName}
              info={userData.description}
              containerStyles={{ padding: 16, backgroundColor: 'transparent', borderRadius: 0 }}
              titleStyles={{ fontSize: 18 }}
              followers={userData.followers}
              following={userData.following}
              posts={userData.posts}
            />
          </View>

          {/* Iconos de opciones */}
          <View className="left-[2%]" style={styles.iconTabContainer}>
              <TouchableOpacity  style={{height: '100%', width: '33%'}} onPress={()=>{ handlePostButton('all')}}>
                <View style={styles.iconStyles}>
                        <PostsIcon size={40} />
                        <Text className={textLight} style={{ alignSelf: 'center' }}>Publicaciones</Text>
                </View> 
              </TouchableOpacity>
               
              <TouchableOpacity style={{height: '100%', width: '33%'}}  onPress={()=>{ handlePostButton('favorites')}}>
                <View  style={styles.iconStyles}> 
                  <StarIcon size={40} />
                    <Text className={textLight} style={{ alignSelf: 'center' }}>Favoritas</Text>
                </View> 
              </TouchableOpacity>
            
            
                <TouchableOpacity style={{height: '100%', width: '33%'}} onPress={()=>{ handlePostButton('archived')}}>
                  <View  style={styles.iconStyles}>
                    <ArchiveIcon2 size={40} />
                      <Text className={textLight} style={{ alignSelf: 'center' }}>Archivadas</Text>
                  </View>
                </TouchableOpacity> 
           
          </View>

          {/* Línea divisoria */}
          <View
            style={{
              height: 1,
              width: '200%',
              marginLeft: '-20%',
              backgroundColor: '#cccc',
              elevation: 5,
              marginVertical: 20,
            }}
          />
        </View>
      </Screen>
    </View>
  );

  return (
    <SafeAreaView className="h-full mt-[-35]" style={{ backgroundColor: 'white' }}>
      {/* FlatList con encabezado y lista de posts */}
      <FlatList
        ListHeaderComponent={renderHeader}
        data={filterPosts}  // Puedes pasar datos aquí o usar PostCardList como se muestra
        renderItem={({item}) => <PostCard location={item.location} image={item.image} user={item.user} date={item.date} description={item.description} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  iconTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '-5%',
    width: '100%',
    shadowColor: 'black',
    shadowRadius: 4,
    height: 80,
  },
  iconStyles: {
    marginLeft: -13,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -5
  },
  avatarContainer: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});

