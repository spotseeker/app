import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "Campo requerido" })
    .min(3, { message: "minimo 3 caracteres" }),
  password: z
    .string({ required_error: "Campo requerido" })
    .min(6, { message: "Contraseña invalida minimo 6 caracteres" }),
});

export const RegisterStep1 = z.object({
  email: z
    .string()
    .email({ message: "Introduzca un correo valido" })
    .min(1, { message: "Campo requerido por favor introduzca correo" }),
  username: z
    .string({ required_error: "Campo requerido" })
    .min(3, { message: "minimo 3 caracteres" }),
});

export const EmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Introduzca un correo valido" })
    .min(1, { message: "Campo requerido por favor introduzca correo" })
})

export const OTPSchema = z.object({
  otp: z
    .string({ message: "Campo requerido" })
    .max(6, { message: "Campo requerido por favor introduzca correo" })
})

export const ResetPasswordSchema = z.object({
  newPassword: z
    .string({ required_error: "Campo requerido" })
    .min(6, { message: "Contraseña invalida minimo 6 caracteres" }),
  confirmNewPassword: z
    .string({ required_error: "Campo requerido" })
    .min(6, { message: "Contraseña invalida minimo 6 caracteres" }),
}).refine(
  (values) => {
    return values.newPassword === values.confirmNewPassword
  },
  {
    message: "Las contraseñas deben coincidir",
    path: ["confirmNewPassword"]
  }
)
