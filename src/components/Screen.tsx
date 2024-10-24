import React, { ReactNode } from 'react'
import { Dimensions, View, KeyboardAvoidingView, Platform } from 'react-native'
type ScreenProp = {
  children: ReactNode
}
function Screen({ children }: ScreenProp) {
  return (
    <View
      className="w-full flex justify-center h-full px-[10px] my-6"
      style={{
        minHeight: Dimensions.get('window').height - 100
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    </View>
  )
}

export default Screen
