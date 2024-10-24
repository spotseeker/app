import * as React  from 'react';
import { View , Text , Image , useColorScheme } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "@/components/Icons";

type PostCardProps = {
    
    ubicacion: string;
    usuario: string;
    fecha : Date;
    image : string;
    descripcion: string;

}






export default function PostCard ({
    ubicacion ,
    image,
    descripcion,
    usuario,
    fecha,
}: PostCardProps){
    const { StarIcon, HeartIcon,CommentIcon } = Icons;
    useColorScheme();
    return(
        
        <SafeAreaView className="w-full bg-white rounded-3xl p-2 my-3">
            
            <View className=' rounded-xl'>
            <Text className='text-coloricon text-2xl font-extrabold '>{usuario}</Text>
                <Image source={{uri : image }}
                 className="w-full h-72 "
                 style={{resizeMode:"contain"}}/>
            </View>
            <View className='flex-row items-center gap-3 ml-3 mr-5 justify-content '>
            <HeartIcon size={5}  />
            
            <CommentIcon  />
            <StarIcon  />
            </View>
            <View className='flex-row justify-between'>
            <Text  className="text-coloricon text-16px font-pbold mt--50px">{ubicacion}</Text>
            <Text>{fecha.toLocaleDateString()}</Text>
         
            </View>
            <Text>{descripcion}</Text>
            
          

        </SafeAreaView>
    )
}
