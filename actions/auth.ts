'use server';
import { formatError } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FormState } from '@/lib/types';
import { SignupFormSchema } from '@/lib/validations';
import { getDbClient } from '@/lib/database';
import { hashString } from '@/lib/hashing';
import { createJwt } from '@/lib/session';

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { data, error } = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const formattedErrors = error && formatError(error);

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
    } else if (!data) {
      return {
        ...state,
        errors: {
          email: ['Something went wrong, try again later'],
        },
      };
    }

    const hashedPassword = hashString(data?.password);
    const client = getDbClient();
    await client.collection('users').insertOne({
      email: data.email,
      password: hashedPassword,
    });

    const token = createJwt({ email: data.email });
    const cookieStore = await cookies();
    cookieStore.set('sessionToken', token, { httpOnly: true });
  } catch (error) {
    console.error(error);
    return {
      ...state,
      errors: {
        email: ['Something went wrong, try again later'],
      },
    };
  }

  redirect('/');
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { data, error } = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const formattedErrors = error && formatError(error);

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
    } else if (!data) {
      return {
        ...state,
        errors: {
          email: ['Something went wrong, try again later'],
        },
      };
    }

    const hashedPassword = hashString(data?.password);
    const client = getDbClient();
    const user = await client
      .collection('users')
      .findOne({ email: data.email, password: hashedPassword });

    if (!user) {
      return {
        ...state,
        errors: {
          email: ['Invalid credentials'],
        },
      };
    }

    const token = createJwt({ email: data.email });
    const cookieStore = await cookies();
    cookieStore.set('sessionToken', token, { httpOnly: true });
  } catch (error) {
    console.error(error);
    return {
      ...state,
      errors: {
        email: ['Something went wrong, try again later'],
      },
    };
  }

  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('sessionToken');
}
