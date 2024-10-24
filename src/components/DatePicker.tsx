import React, { useEffect } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Control, useController } from 'react-hook-form'
import { Platform, View, TouchableOpacity, Text } from 'react-native'

type DatePickerProps = {
  setDate: (date: Date) => void
  setShow: (show: boolean) => void
  control: Control
  name: string
  setDateError: (errors: string) => void
  show: boolean
}

function DatePicker({ setDate, setShow, control, name, setDateError, show }: DatePickerProps) {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: new Date()
  })
  const { error } = fieldState

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      setShow(false)
      if (selectedDate) {
        field.onChange(selectedDate)
        setDate(selectedDate)
        setDateError('')
      } else {
        setDateError('No se seleccionó una fecha válida.')
      }
    } else {
      setShow(false)
      if (!field.value) {
        setDateError('Por favor, selecciona una fecha.')
      }
    }
  }

  const confirmIOSDate = () => {
    const selectedDate = field.value
    if (selectedDate) {
      field.onChange(selectedDate)
      setDate(selectedDate)
      setShow(false)
      setDateError('')
    } else {
      setDateError('Por favor, selecciona una fecha.')
    }
  }

  useEffect(() => {
    if (error) {
      setDateError(error.message as string)
    } else {
      setDateError('')
    }
  }, [fieldState.error, setDateError])

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={field.value || new Date()}
        mode="date"
        display="spinner"
        is24Hour={true}
        onChange={onChange}
        style={{
          height: 120,
          marginTop: -10
        }}
        textColor="black"
      />

      {show && Platform.OS === 'ios' && (
        <View className="flex flex-row justify-around my-[10px]">
          <TouchableOpacity
            style={{
              backgroundColor: '#11182711',
              paddingHorizontal: 20,
              borderRadius: 20,
              marginHorizontal: 20
            }}
          >
            <Text
              style={{ color: '#075985', fontSize: 14, fontWeight: '500' }}
              onPress={() => setShow(false)}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#11182711',
              paddingHorizontal: 20,
              borderRadius: 20,
              marginHorizontal: 20
            }}
            onPress={confirmIOSDate}
          >
            <Text style={{ color: '#075985', fontSize: 14, fontWeight: '500' }}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default DatePicker
