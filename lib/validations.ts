import { z } from 'zod';

export const SignupFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(3, { message: 'Minimum required length for a password is 3 symbols' })
    .regex(/[a-zA-Z]/, {
      message: 'Password must contain at least one letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .trim(),
});
