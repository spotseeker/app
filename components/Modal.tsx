import React, { ReactNode } from "react";
import { Modal as ReactModal, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur'

type ModalProps = {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
  backgroundColor?: string; 
};

const Modal = ({children,visible,onClose,backgroundColor }:ModalProps) => {
  return ( 
    <ReactModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
  
        <BlurView className='h-full w-full' intensity={100} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.container} />
          
            <View style={[styles.secondContainer,{ backgroundColor: backgroundColor || 'white' }]}>
            {children}
            </View>
          
        </BlurView>
      </ReactModal>
   );
}
 
export default Modal;

const styles = StyleSheet.create({
  secondContainer: {
    width: 309,
          padding: 24, 
          backgroundColor: 'white',
          borderRadius: 16, 
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.5, 
          shadowRadius: 6, 
          elevation: 5, 
          alignItems: 'center',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(128, 128, 120, 0.3)', 
  }   
})