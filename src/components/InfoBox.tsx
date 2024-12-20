import React from 'react'
import { View, Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/Colors'
import { router } from 'expo-router'

interface InfoBoxProps {
  username: string | undefined
  title: string | undefined
  subtitle: string
  info: string | undefined
  followers?: number
  following?: number
  posts?: number
  containerStyles?: ViewStyle // Cambiado para aceptar estilos en línea
  titleStyles?: TextStyle // Cambiado para aceptar estilos en línea
}

const InfoBox: React.FC<InfoBoxProps> = ({
  username,
  title,
  subtitle,
  info,
  followers,
  following,
  posts,
  containerStyles,
  titleStyles
}) => {
  return (
    <View style={[{ padding: 20 }, containerStyles]}>
      <Text
        className="text-lightc font-bold"
        style={[
          {
            color: Colors.text,
            fontWeight: '900',
            textAlign: 'center',
            marginTop: '-5%'
          },
          titleStyles
        ]}
      >
        {title}
      </Text>
      <Text
        className="text-lightc font-plight"
        style={{
          textAlign: 'center',
          color: Colors.text,
          fontWeight: '600',
          fontSize: 18,
          marginTop: 8
        }}
      >
        {subtitle}
      </Text>
      <Text
        className="text-lightc font-plight"
        style={{
          textAlign: 'center',
          color: Colors.text,
          fontWeight: '100',
          fontSize: 18,
          marginTop: 8
        }}
      >
        {info}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
        <Text
          className="text-lightc font-pbold"
          style={{
            textAlign: 'center',
            color: Colors.text,
            fontWeight: '100',
            fontSize: 14,
            marginRight: '10%',
            marginLeft: '2%'
          }}
        >
          {posts}
          {'\n'}Publicaciones
        </Text>
        <TouchableOpacity onPress={() => router.push(`/${username}/followers`)}>
          <Text
            className="text-lightc font-pbold"
            style={{
              textAlign: 'center',
              color: Colors.text,
              fontWeight: '100',
              fontSize: 14,
              marginRight: '10%'
            }}
          >
            {followers}
            {'\n'}Seguidores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/${username}/following`)}>
          <Text
            className="text-lightc font-pbold"
            style={{
              textAlign: 'center',
              color: Colors.text,
              fontWeight: '100',
              fontSize: 14,
              marginLeft: '5%',
              marginRight: '10%'
            }}
          >
            {following}
            {'\n'}Siguiendo
          </Text>
        </TouchableOpacity>
      </View>
      {/* Línea horizontal divisoria  efecto sombreado*/}
      <View
        style={{
          height: 1,
          width: '200%',
          marginLeft: '-20%',
          backgroundColor: '#cccc',
          elevation: 5, // (Para android ver doc)
          marginVertical: 20
        }}
      />
    </View>
  )
}

export default InfoBox
