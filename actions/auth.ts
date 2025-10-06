'use server';
import { formatError } from 'zod';
import { FormState } from '@/lib/types';
import { SignupFormSchema } from '@/lib/validations';

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const formattedErrors =
    validatedFields.error && formatError(validatedFields.error);

  if (formattedErrors) {
    return {
      ...state,
      errors: formattedErrors
        ? {
            email: formattedErrors?.email?._errors,
            password: formattedErrors?.password?._errors,
          }
        : undefined,
    };
  }

  // TODO: save data into DB, save cookie, redirect

  return state;
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const formattedErrors =
    validatedFields.error && formatError(validatedFields.error);

  if (formattedErrors) {
    return {
      ...state,
      errors: formattedErrors
        ? {
            email: formattedErrors?.email?._errors,
            password: formattedErrors?.password?._errors,
          }
        : undefined,
    };
  }

  // TODO: save cookie, redirect

  return state;
}
