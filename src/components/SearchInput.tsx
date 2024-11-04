import React from 'react'
import { TextInput, View } from 'react-native'
import Icons from './Icons'

type InputProps = {
  value: string
  onChangeText: ((text: string) => void) | undefined
  placeholder?: string
}

function SearchInput({ value, onChangeText, placeholder }: InputProps) {
  const { SearchIcon } = Icons

  return (
    <View className="py-[15px]">
      <View
        className={'flex flex-row border border-gray-400 rounded-md w-[330px] h-[48px]'}
      >
        <TextInput
          className="flex-auto p-[11px] text-wrap"
          placeholder={`${placeholder}`}
          inputMode="text"
          textAlignVertical="top"
          value={value}
          onChangeText={onChangeText}
          style={{
            backgroundColor: 'white'
          }}
        />
        {<SearchIcon color="#ee5d6c" />}
      </View>
    </View>
  )
}

export default SearchInput
