'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/authContext';
import Header from '@/components/header';
import { LoadingContext } from '@/contexts/loaderContext';
import { Loader } from '@/components/loader';

export default function LayoutWithheader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authenticated, user } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authenticated) {
      return router.replace('/auth/login');
    }
  }, [isLoading, authenticated, router]);

  return (
    <>
      <Header />
      {children}
      {isLoading && <Loader />}
    </>
  );
}
