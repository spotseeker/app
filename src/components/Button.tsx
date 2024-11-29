import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type ButtonProps = {
  children: ReactNode
  onPress?: () => void
  variant: 'primary' | 'secondary' | 'gray'
  width: number
  height: number
  disable?: boolean
}

function Button({
  children,
  onPress,
  variant,
  width,
  height,
  disable = false
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: width,
        height: height,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: variant === 'secondary' ? 2 : 0,
        borderColor: variant === 'secondary' ? '#FB9062' : 'transparent'
      }}
      disabled={disable}
    >
      {variant === 'primary' ? (
        <LinearGradient
          colors={['#FB9062', '#EE5D6C']}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{children}</Text>
        </LinearGradient>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: variant === 'gray' ? '#808080' : '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: variant === 'gray' ? '#FFFFFF' : '#FB9062',
              fontWeight: 'bold'
            }}
          >
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Button
