import React, { useState} from "react";
import { View, ScrollView} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Screen from "@/components/Screen";
import { UpdatePasswordSchema} from "@/Schemas/UserSchema";
import CustomInputs from "@/components/CustomInputs";
import CustomButton from "@/components/CustomButton";
import { Avatar } from '@kolking/react-native-avatar';
import { Colors } from "@/constants/Colors";
import ProfileImg from '@/assets/images_app/avatar_users/image_profile.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalAction from "@/components/ModalAction";

export default function UpdatePassword() {
    const { control, handleSubmit, reset} = useForm({
        resolver: zodResolver(UpdatePasswordSchema),
        mode: "onChange",
    });

    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const [isSuccessVisible, setSuccessVisible] = useState(false);
    const [isErrorVisible, setErrorVisible] = useState(false);

    const handleUpdatePassword = () => {
        reset();
        setSuccessVisible(true);
        
    };

    const handleError = () => {
        setErrorVisible(true);
    };

    const onSubmit = () => {
        
        setConfirmationVisible(true);
    };


    return (
        <SafeAreaView className=' w-full bg-white'>
            <ScrollView className="mt-[-10%]">
                <Screen>
                    <View className="flex justify-center items-center mt-[5%]">
                        <View className='mt-[-20%]'>
                            <Avatar source={ProfileImg} color={Colors.text} radius={100} size={100} />
                        </View>
                        <View className='mt-[30px] px-[10%]'>
                            <CustomInputs variant="password" control={control} name="actualPassword">
                                Ingresa Tu Clave Actual
                            </CustomInputs>
                            <CustomInputs variant="password" control={control} name="newPassword">
                                Ingresa Tu Nueva Clave
                            </CustomInputs>
                            <CustomInputs variant="password" control={control} name="confirmNewPassword">
                                Confirma Tu Nueva Clave
                            </CustomInputs>
                        </View>
                    </View>
                    <View className="flex justify-around ml-[55%] pb-[10] mt-[20%]">
                     
                        <CustomButton
                            width={150}
                            height={47}
                            variant="primary"
                            onPress={handleSubmit(onSubmit, handleError)}
                        
                        >
                            Cambiar Contraseña
                        </CustomButton>
                    </View>
                </Screen>
            </ScrollView>

               {/* Modal de confirmación */}
               <ModalAction
                visible={isConfirmationVisible}
                onClose={() => setConfirmationVisible(false)}
                onConfirm={handleSubmit(() => {
                    handleUpdatePassword();
                    setConfirmationVisible(false); 
                }, handleError)} 
                action="confirmation"
                message="La proxima vez que ingreses usaras esta clave ¿Estás seguro de realizar este cambio?"
           />

            {/* Modal de éxito */}
            <ModalAction
                action='success'
                message='Contraseña Actualizada con exito'
                visible={isSuccessVisible}
                onClose={() => {
                    setSuccessVisible(false) 
                }}
            />

            {/* Modal de error */}
            <ModalAction
                action='error'
                message='Hubo un error al actualizar la clave. Por favor, verifica los campos.'
                visible={isErrorVisible}
                onClose={() => setErrorVisible(false)}
            />
        </SafeAreaView>
    );
}

