import React from 'react';
import { Modal, View, Text } from 'react-native';
import { BlurView } from 'expo-blur'; // Importa BlurView
import Icons from './Icons'; 
import CustomButton from './CustomButton'; // Importa tu componente de botón personalizado

interface ReusableModalProps {
  type: 'success' | 'confirmation' | 'error';
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void; 
  message?: string;
}

const { CheckIcon, CrossDeleteIcon, WarningIcon } = Icons;

// Función para obtener el ícono adecuado según el tipo de modal
const getModalIcon = (type: 'success' | 'confirmation' | 'error') => {
  switch (type) {
    case 'success':
      return { IconComponent: CheckIcon }; // Verde
    case 'confirmation':
      return { IconComponent: WarningIcon, color: '#EEAF61' }; 
    case 'error':
      return { IconComponent: CrossDeleteIcon }; 
    default:
      return { IconComponent: null, color: '' }; // No retorna ícono por defecto
  }
};

const ReusableModal: React.FC<ReusableModalProps> = ({ type, visible, onClose, onConfirm, message }) => {
  const { IconComponent, color } = getModalIcon(type);
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Fondo desenfocado con tinte gris */}
      <BlurView className='h-full w-full' intensity={100} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(128, 128, 120, 0.3)', 
        }} />
        
        <View style={{
          width: 288,
          padding: 24, // Ajusta el padding según sea necesario
          backgroundColor: 'white',
          borderRadius: 16, // Borde redondeado
          shadowColor: 'black', // Color de la sombra gris
          shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
          shadowOpacity: 0.5, // Opacidad de la sombra
          shadowRadius: 6, // Radio de la sombra
          elevation: 5, // Elevación para Android
          alignItems: 'center',
        }}>
          
          {/* Renderiza el ícono si IconComponent no es null */}
          {IconComponent && <IconComponent color={color} size={50} />}
          
          <Text className="text-coloricon font-pbold text-[20px] mb-5">{message || 'Este es un mensaje de ejemplo.'}</Text>
          
          {/* Mostrar botones de confirmación solo para tipos de modal de confirmación */}
          {type === 'confirmation' && (
            <View className="flex-row justify-around w-full">
              <CustomButton
                onPress={onClose}
                variant="secondary"
                width={100} // Ajusta el ancho según sea necesario
                height={40} // Ajusta la altura según sea necesario
              >
                Cancelar
              </CustomButton>
              <CustomButton
                onPress={onConfirm} // Llama a la función de confirmación
                variant="primary"
                width={100} // Ajusta el ancho según sea necesario
                height={40} // Ajusta la altura según sea necesario
              >
                Sí
              </CustomButton>
            </View>
          )}
        </View>
      </BlurView>
    </Modal>
  );
};

export default ReusableModal;