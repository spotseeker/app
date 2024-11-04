import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Icons from './Icons'
import Button from './Button'
import Modal from './Modal'

interface ModalActionProps {
  action: 'success' | 'confirmation' | 'error'
  visible: boolean
  onClose: () => void
  onConfirm?: () => void
  message?: string
  backgroundColor?: string
}

const { CheckIcon, CrossDeleteIcon, WarningIcon } = Icons

const getModalIcon = (action: 'success' | 'confirmation' | 'error') => {
  switch (action) {
    case 'success':
      return { IconComponent: CheckIcon }
    case 'confirmation':
      return { IconComponent: WarningIcon, color: '#EEAF61' }
    case 'error':
      return { IconComponent: CrossDeleteIcon, color: '#FF0000' }
    default:
      return { IconComponent: null, color: '' }
  }
}

const ModalAction: React.FC<ModalActionProps> = ({
  action,
  visible,
  onClose,
  onConfirm,
  message,
  backgroundColor
}) => {
  const { IconComponent, color } = getModalIcon(action)

  useEffect(() => {
    if (visible && (action === 'success' || action === 'error')) {
      const timer = setTimeout(() => {
        onClose()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [visible, action, onClose])

  return (
    <Modal visible={visible} onClose={onClose} backgroundColor={backgroundColor}>
      {IconComponent && <IconComponent color={color} size={50} />}

      <Text className="text-coloricon font-pbold text-[20px] mb-5">
        {message || 'Este es un mensaje de ejemplo.'}
      </Text>

      {action === 'confirmation' && (
        <View className="flex-row justify-around w-full">
          <Button onPress={onClose} variant="secondary" width={100} height={40}>
            Cancelar
          </Button>
          <Button onPress={onConfirm} variant="primary" width={100} height={40}>
            Sí
          </Button>
        </View>
      )}
    </Modal>
  )
}

export default ModalAction
