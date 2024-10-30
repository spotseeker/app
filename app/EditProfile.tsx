import React, { useState} from "react";
import { View, ScrollView} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Screen from "@/components/Screen";
import { EditProfileSchema} from "@/Schemas/UserSchema";
import CustomInputs from "@/components/CustomInputs";
import CustomButton from "@/components/CustomButton";
import { Avatar } from '@kolking/react-native-avatar';
import { Colors } from "@/constants/Colors";
import ProfileImg from '@/assets/images_app/image_profile.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalAction from "@/components/ModalAction";

export default function EditProfile() {


    const { control, handleSubmit, reset} = useForm({
        resolver: zodResolver(EditProfileSchema),
        mode: "onChange",
    });


    const [isConfirmationVisible, setConfirmationVisible] = useState(false);
    const [isSuccessVisible, setSuccessVisible] = useState(false);
    const [isErrorVisible, setErrorVisible] = useState(false);




    const handleEditProfile = () => {
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
        <SafeAreaView className='w-full h-full bg-white'>
            <ScrollView className="mt-[-5%]">
                <Screen>
                    <View className="flex  justify-center items-center mt-[-30%]">
                        <View className='mt-[10%]'>
                            <Avatar source={ProfileImg} color={Colors.text} radius={90} size={90} />
                        </View>
                        <View className='mt-[30px] px-[10%]'>
                            <CustomInputs variant="default" control={control} name="username">
                                Nombre de Usuario
                            </CustomInputs>
                            <CustomInputs variant="default" control={control} name="firstname">
                                Nombre
                            </CustomInputs>
                            <CustomInputs variant="default" control={control} name="lastname">
                               Apellido
                            </CustomInputs>
                            
                            <CustomInputs variant="description" control={control} name="aboutme">
                            Descripción
                            </CustomInputs>



                        </View>
                    </View>
                    <View className="flex justify-around ml-[60%] pb-[10]">
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
                    handleEditProfile();
                    setConfirmationVisible(false); 
                }, handleError)} 
                action="confirmation"
                message=" La proxima vez que ingreses se aplicaran estos cambios ¿Estás seguro de continuar?"
           />

            {/* Modal de éxito */}
            <ModalAction
                action='success'
                message='Datos de perfil Actualizados con exito'
                visible={isSuccessVisible}
                onClose={() => {
                    setSuccessVisible(false) 
                }}
            />

            {/* Modal de error */}
            <ModalAction
                action='error'
                message='Hubo un error al actualizar la informacion. Por favor, verifica los campos.'
                visible={isErrorVisible}
                onClose={() => setErrorVisible(false)}
            />
        </SafeAreaView>
    );
}

