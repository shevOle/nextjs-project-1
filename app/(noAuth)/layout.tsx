'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContextProvider, AuthContext } from '@/contexts/authContext';
import { LoadingContext } from '@/contexts/loaderContext';
import { Loader } from '@/components/loader';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authenticated } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authenticated) {
      return router.replace('/');
    }
  }, [isLoading, authenticated, router]);

  return (
    <AuthContextProvider>
      {children}
      {isLoading && <Loader />}
    </AuthContextProvider>
  );
}
