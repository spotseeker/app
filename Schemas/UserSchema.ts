import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "Campo requerido" })
    .min(3, { message: "minimo 3 caracteres" }),
  password: z
    .string({ required_error: "Campo requerido" })
    .min(6, { message: "Contraseña invalida minimo 6 caracteres" }),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({ message: "Introduzca un correo valido" })
    .min(1, { message: "Campo requerido por favor introduzca correo" }),
  username: z
    .string({ required_error: "Campo requerido" })
    .min(1, { message: "Campo obligatorio" }),
  firstname: z
    .string({ required_error: "Campo requerido" })
    .min(1, { message: "Campo obligatorio" }),
  lastname: z
    .string({ required_error: "Campo requerido" })
    .min(1, { message: "Campo obligatorio" }),
  aboutme: z
    .string({ required_error: "Campo requerido" })
    .min(1, { message: "Campo obligatorio" }),
  birthdate: z.date({ required_error: "Campo requerido" }),
  password: z
    .string({ required_error: "Campo requerido" })
    .min(1, { message: "Contraseña invalida minimo 6 caracteres" }),
  confirm: z
    .string({ required_error: "Campo requerido" })
    .min(6, { message: "Contraseña invalida mínimo 6 caracteres" }),
  code: z
    .string({ required_error: "Campo requerido" })
    .min(6, { message: "Contraseña invalida minimo 6 caracteres" }),
});

export type UserData = z.infer<typeof RegisterSchema>;
