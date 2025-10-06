import { textInput } from '@/styles/form';

const AuthForm = (formAction: any) => {
  return (
    <form action={formAction} className='flex flex-col gap-2.5 mx-auto mt-4'>
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
    </form>
  );
};

export default AuthForm;
