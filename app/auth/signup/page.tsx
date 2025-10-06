import { AuthType } from '@/lib/constants';
import AuthenticationComponent from '@/components/authForm';

export default function SignUpComponent() {
  return (
    <>
      <h2 className='mt-10 px-5 mx-auto text-center text-lg font-bold'>
        Create your account to interact with the platform
      </h2>
      <AuthenticationComponent type={AuthType.SIGNUP}></AuthenticationComponent>
    </>
  );
}
