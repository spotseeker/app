import * as React  from 'react';
import  { useState } from 'react';
import { View , Text , Image , StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AntDesign from '@expo/vector-icons/AntDesign';
import { Avatar } from '@kolking/react-native-avatar';
import ProfileImg from '@/assets/images_app/image_profile.png'
import {Colors} from "@/constants/Colors"

type PostCardProps = {
    
    location: string;
    user: string;
    date : Date;
    image : string;
    description: string;

}
export default function PostCard ({
    location ,
    image,
    description,
    user,
    date,
    
}: PostCardProps){
    const [count, setCount]= React.useState(1);
   
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
      if (!liked) {
        setCount(count + 1); // Incrementar el contador de likes
        setLiked(true); // Marcar que el usuario ha dado like
        // Aquí puedes agregar lógica para guardar el like en un backend si es necesario
      }
    };
    return(
        
        <SafeAreaView className="w-full bg-white rounded-1xl p-5 my-3">
            
             <View className='flex row justify-between mr-[55] mt-[-60]  ' >
              {/* Avatar */}
             
              <Text style={styles.textUser}  className='text-coloricon ml-1 mt-5  font-extrabold   '>{user}</Text>
              <View className='flex row justify-content mr-[250]'>
                
                <Avatar className='mt-[-25] ' source={ProfileImg} color={Colors.text} radius={30} size={30} />
                </View>
             
              </View>
                          
            <View className=' rounded-xl mt-[-40] '>
            <AntDesign
               name="ellipsis1"
               size={28}
               style={styles.iconellipsis}>

               </AntDesign>
                <Image source={{uri : image }}
                 className=" h-72 "
                 style={{resizeMode:"contain"}}/>
            </View>
            
              <View className='flex-row items-center gap-0.5   justify-content '>
             <View className='flex-row items-center gap-3 ml-1 mr-1 mt-1 justify-content '>
         
             <AntDesign
          name={liked ? "heart" : "hearto"} // Cambiar el ícono según si el usuario ha dado like
          size={28}
          color={liked ? "red" : "black"} // Cambiar el color del ícono
          onPress={handleLike} // Llamar a la función handleLike al presionar
        />
        <Text className='font-pbold'>{count}</Text>
         
              </View>
            <View className='flex-row items-center gap-3   '>
           
            <AntDesign  name="message1"
             size={28} 
             >
           
            </AntDesign>
            </View>
            <View className='flex-row items-center gap-3  justify-content '>
           
            <AntDesign  name="staro" 
             size={28}
             className='ml-1'>
           
            </AntDesign>
            </View>
            </View>

            <View className='flex-row justify-between'>
            <AntDesign  name="enviromento"
            size={20}
             >
           </AntDesign>

           <Text  className="text-coloricon text-14px mr-20 font-pbold ">{location}</Text>
            <Text>{date.toLocaleDateString()}</Text>
         
            </View>
            <Text>{description}</Text>
            
        </SafeAreaView>
)
}
const styles = StyleSheet.create({
  textUser: {
    fontSize: 18, 
    marginLeft:45,
  },
    avatarContainer:{
      marginTop:0,
      borderWidth: 5,
      borderColor: 'white',
      borderRadius: 60,
      width: 1000,
      height: 1000,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      overflow: 'hidden',
    },
    iconellipsis:{
      marginLeft:310,
      marginRight:'auto',
      marginTop:-20,
    }
  
  })
