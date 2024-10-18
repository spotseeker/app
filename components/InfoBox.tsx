import React from 'react';
import { View, Text, ViewStyle, TextStyle } from "react-native";
import {Colors} from '../constants/Colors'

interface InfoBoxProps {
    title: string;
    subtitle: string;
    info: string;
    followers: number;
    following: number;
    posts: number;
    containerStyles?: ViewStyle; // Cambiado para aceptar estilos en línea
    titleStyles?: TextStyle;     // Cambiado para aceptar estilos en línea
}

const InfoBox: React.FC<InfoBoxProps> = ({
    title,
    subtitle,
    info,
    followers,
    following,
    posts,
    containerStyles,
    titleStyles,
}) => {
    return (
    
        <View style={[{ padding: 20 }, containerStyles]}>
            <Text style={[{ color: Colors.text, fontWeight: '900', textAlign: 'center', textDecorationLine: 'underline' }, titleStyles]}>
                {title}
            </Text>
            <Text style={{ textAlign: 'center', color:Colors.text, fontWeight: '600', fontSize: 20, marginTop: 8 }}>
                {subtitle}
            </Text>
            <Text style={{ textAlign: 'center', color:Colors.text, fontWeight: '400', fontSize: 20, marginTop: 8 }}>
                {info}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
                <Text style={{ textAlign: 'center', color:Colors.text, fontWeight: '600', fontSize: 18, marginRight: '10%', marginLeft:'-5%' }}>
                    {posts}{"\n"}Publicaciones
                </Text>
                <Text style={{ textAlign: 'center', color:Colors.text, fontWeight: '600', fontSize: 18, marginRight: '10%' }}>
                    {followers}{"\n"}Seguidores
                </Text>
                <Text style={{ textAlign: 'center', color:Colors.text, fontWeight: '600', fontSize: 18 }}>
                    {following}{"\n"}Siguiendo
                </Text>
               
            </View> 
            {/* Línea horizontal divisoria  efecto sombreado*/}
            <View 
              style={{
                height: 1,
                width: '200%', 
                marginLeft:'-20%',
                backgroundColor: '#cccc', 
                elevation: 5, // (Para android ver doc)
                marginVertical: 20,
              }} 
            />
        </View>
    );
};

export default InfoBox;
