'use client';

import { useActionState, useEffect, FC, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signup, login } from '@/actions/auth';
import { FormState } from '@/lib/types';
import { AuthType } from '@/lib/constants';
import { btnPrimary, btnSecondary } from '@/styles/button';
import { textInput } from '@/styles/form';
import { NotificationContext } from '@/contexts/notificationContext';

const AuthenticationComponent: FC<{ type: AuthType }> = ({
  type,
}: {
  type: AuthType;
}) => {
  const { enqueueSnackbar } = useContext(NotificationContext);
  const router = useRouter();
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
    if (pending) return;

    if (state.errors) {
      Object.values(state.errors)
        .filter((error) => !!error)
        .forEach((error) =>
          enqueueSnackbar(error.join('. '), { variant: 'error' })
        );
    } else if (state.email) {
      router.replace('/');
    }
  }, [state, pending]);

  return (
    <div className='max-w-md mx-auto px-5 xs:px-0'>
      <form action={action} className='flex flex-col gap-2.5 mx-auto mt-4'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm/6 font-semibold text-gray-900'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            placeholder='Enter your email'
            className={textInput}
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm/6 font-semibold text-gray-900'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
            className={textInput}
          />
        </div>
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
      </form>
    </div>
  );
};

export default AuthenticationComponent;
