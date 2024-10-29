import React, { useState} from "react";
import { View, ScrollView} from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import Screen from "@/components/Screen";
import { UpdatePasswordSchema} from "@/Schemas/UserSchema";
import CustomInputs from "@/components/CustomInputs";
import CustomButton from "@/components/CustomButton";
import { Avatar } from '@kolking/react-native-avatar';
import { Colors } from "@/constants/Colors";
import ProfileImg from '@/assets/images_app/image_profile.png';
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
        <SafeAreaView className=' w-full bg-white mt-[-20%]'>
            <ScrollView>
                <Screen>
                    <View className="flex justify-center items-center mt-[5%]">
                        <View className='mt-[-10%]'>
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
                    <View className="flex flex-row justify-around mt-20">
                        <CustomButton
                            width={130}
                            height={47}
                            variant="secondary"
                            onPress={() => {
                                reset();
                                router.replace("/Settings");
                            }}
                        >
                            Cancelar
                        </CustomButton>
                        <CustomButton
                            width={130}
                            height={47}
                            variant="primary"
                            onPress={handleSubmit(onSubmit, handleError)}
                        
                        >
                            Actualizar
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

