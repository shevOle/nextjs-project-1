'use client';
import { useCallback, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { btnSecondary } from '@/styles/button';
import { logout } from '@/actions/auth';
import { NotificationContext } from '@/contexts/notificationContext';
import { LoadingContext } from '@/contexts/loaderContext';
import { AuthContext } from '@/contexts/authContext';

const Header = () => {
  const { enqueueSnackbar } = useContext(NotificationContext);
  const { setIsLoading } = useContext(LoadingContext);
  const { user } = useContext(AuthContext);

  const onLogOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await logout();
      redirect('/auth/login');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderNavigation = useCallback(() => {
    if (!user) {
      return (
        <nav>
          <Link href='/auth/login' className={btnSecondary}>
            Sign In
          </Link>
          <Link href='/auth/signup' className={btnSecondary}>
            Sign Up
          </Link>
        </nav>
      );
    } else {
      return (
        <nav>
          <Link href='/my-map' className={btnSecondary}>
            My Map
          </Link>
          <button onClick={onLogOut} className={btnSecondary}>
            Log Out
          </button>
        </nav>
      );
    }
  }, [user, onLogOut]);

  return (
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
      {renderNavigation()}
    </div>
  );
};

export default Header;
