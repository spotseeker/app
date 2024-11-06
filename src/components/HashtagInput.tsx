import React from 'react'
import { TextInput, View, Text } from 'react-native'

type HashtagInputProps = {
  text?: string
  placeholder?: string
  value: string
}

export default function HashtagInput({ text, placeholder, value }: HashtagInputProps) {
  return (
    <View className="py-[15px]">
      <Text className="text-lightc font-psemibold text-[14px] pb-[5px]">{text}</Text>

      <View className="flex flex-row  border border-gray-400 rounded-md w-[330px] h-[120px]">
        <TextInput
          className="flex-auto p-[11px] text-wrap"
          placeholder={`${placeholder}`}
          multiline={true}
          inputMode={'text'}
          textAlignVertical="top"
          value={value}
          editable={false}
        />
      </View>
    </View>
  )
}
