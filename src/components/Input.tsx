import React, { useState } from 'react'
import { TextInput, View, Text, Pressable } from 'react-native'
import Icons from './Icons'
import { styled } from 'nativewind'
import { Control, useController } from 'react-hook-form'
const StyledPressable = styled(Pressable)

type InputProps = {
  text?: string
  variant:
    | 'default'
    | 'email'
    | 'edit'
    | 'search'
    | 'password'
    | 'description'
    | 'date'
    | 'number'
    | 'comment'

  placeholder?: string
  name: string
  control: Control
  date?: Date
}

function Input({ text, variant, placeholder, name, control, date }: InputProps) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name
  })
  const { error } = fieldState
  const { PersonIcon, SearchIcon, EditIcon, PasswordIcon, CalendarIcon } = Icons
  const [shownPassword, setShownPassword] = useState(true)

  const renderIcon = () => {
    switch (variant) {
      case 'email':
        return <PersonIcon color="#ee5d6c" />
      case 'search':
        return <SearchIcon color="#ee5d6c" />
      case 'date':
        return <CalendarIcon />
      case 'edit':
        return <EditIcon color="#ee5d6c" />
      case 'password':
        return (
          <StyledPressable onPress={() => setShownPassword(!shownPassword)}>
            <PasswordIcon color="#ee5d6c" shown={shownPassword} />
          </StyledPressable>
        )

      default:
        return null
    }
  }

  return (
    <View className="py-[15px]">
      <Text className="text-lightc font-psemibold text-[14px] pb-[5px]">{text}</Text>

      <View
        className={`flex flex-row  border border-gray-400 rounded-md ${
          variant == 'description'
            ? 'w-[330px] h-[120px]'
            : variant == 'comment'
              ? 'w-[250px] h-[48px]'
              : 'w-[330px] h-[48px]'
        }`}
      >
        <TextInput
          className="flex-auto p-[11px] text-wrap"
          placeholder={`${placeholder}`}
          secureTextEntry={variant === 'password' && shownPassword}
          multiline={variant == 'description'}
          inputMode={variant == 'number' ? 'numeric' : 'text'}
          textAlignVertical="top"
          value={
            variant == 'date' ? (date ? date.toLocaleDateString() : '') : field.value
          }
          onChangeText={field.onChange}
          editable={variant == 'date' ? false : true}
        />
        {renderIcon()}
      </View>
      {error?.message && <Text>{error.message}</Text>}
    </View>
  )
}

export default Input
