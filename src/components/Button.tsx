import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type ButtonProps = {
  children: ReactNode
  onPress?: () => void
  variant: 'primary' | 'secondary' | 'gray'
  width: number
  height: number
}

function Button({ children, onPress, variant, width, height }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7} // Cambia la opacidad al presionar
      style={{ width: width, height: height }}
    >
      <LinearGradient
        colors={variant === 'primary' ? ['#FB9062', '#EE5D6C'] : ['#FFFFFF', '#FFFFFF']}
        className={`${variant == 'primary' ? '' : 'border-2 border-helper'}`}
        style={{ flex: 1, borderRadius: 10 }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text className={`${variant == 'primary' ? 'text-white' : 'text-helper'} font-semibold`}>
            {children}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default Button
