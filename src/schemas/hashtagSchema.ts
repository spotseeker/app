import z from 'zod'

export const HashtagSchema = z.object({
  hashtag: z
    .string({ required_error: 'Campo requerido' })
    .regex(/^#[a-zA-Z0-9_áéíóúÁÉÍÓÚñÑ]+$/, { message: 'Formato invalido' })
})

//PostSchema
export const postSchema = z.object({
  body: z.string().min(1, 'La descripción no puede estar vacía') // Valida que body no esté vacío
})

export type CreatePostForm = z.infer<typeof postSchema>
