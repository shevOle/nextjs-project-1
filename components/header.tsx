import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/lib/types';
import { btnSecondary } from '@/styles/button';

const renderNavigation = (user: User | null) => {
  if (!user) {
    return (
      <nav>
        <Link href='/auth/signin' className={btnSecondary}>
          Sign In
        </Link>
        <Link href='/auth/signup' className={btnSecondary}>
          Sign Up
        </Link>
      </nav>
    );
  }
};

const Header = (props: { user: User | null }) => (
  <div className='flex justify-between items-center p-5'>
    <Link href='/' className='flex items-center'>
      <Image
        src='/images/map-icon.svg'
        alt='scratch map icon'
        width={80}
        height={60}
        className='p-2 mr-2.5'
      />
      <p className='font-bold'>ScratchMyMap</p>
    </Link>
    {renderNavigation(props.user)}
  </div>
);

export default Header;
