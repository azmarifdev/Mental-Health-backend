import { z } from 'zod';

const createUserZodSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: 'Full name is required.',
      }),
      email: z
         .string({
            required_error: 'Email is required',
         })
         .email(),
      password: z.string({
         required_error: 'Password is required',
      }),
      profileImage: z.string().optional(),
   }),
});

export const UserValidation = {
   createUserZodSchema,
};
