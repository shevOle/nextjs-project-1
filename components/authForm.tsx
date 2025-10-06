'use client';

import { useActionState, useEffect, FC } from 'react';
import Link from 'next/link';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { signup, login } from '@/actions/auth';
import { FormState } from '@/lib/types';
import { AuthType } from '@/lib/constants';
import { btnPrimary, btnSecondary } from '@/styles/button';
import AuthForm from '@/components/authFormComponent';

const AuthenticationComponent: FC<{ type: AuthType }> = ({
  type,
}: {
  type: AuthType;
}) => {
  const isLogin = type === AuthType.LOGIN;
  const formAction = isLogin ? login : signup;

  const [state, action, pending] = useActionState<FormState>(
    formAction as any,
    {
      email: '',
      password: '',
    }
  );

  useEffect(() => {
    if (state.errors) {
      Object.values(state.errors)
        .filter((error) => !!error)
        .forEach((error) =>
          enqueueSnackbar(error.join('. '), { variant: 'error' })
        );
    }
  }, [state.errors]);

  return (
    <>
      <SnackbarProvider />
      <div className='max-w-md mx-auto px-5 xs:px-0'>
        <AuthForm formAction={action}></AuthForm>
        <div className='flex flex-col justify-center xs:justify-end xs:flex-row gap-x-2 mt-2.5'>
          <button type='submit' className={btnPrimary} disabled={pending}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
          <Link
            href={isLogin ? '/auth/signup' : '/auth/login'}
            className={btnSecondary}
          >
            {isLogin ? 'Create Account' : 'I already have an account'}
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthenticationComponent;
