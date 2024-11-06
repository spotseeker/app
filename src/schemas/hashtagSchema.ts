import z from 'zod'

export const HashtagSchema = z.object({
  hashtag: z
    .string({ required_error: 'Campo requerido' })
    .regex(/^#[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ]+$/, { message: 'Formato invalido' })
})
