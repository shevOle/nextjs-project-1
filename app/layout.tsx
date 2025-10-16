import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from '@/contexts/authContext';
import { LoadingContextProvider } from '@/contexts/loaderContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Scratch My Map',
  description:
    'Digital Scratch Map for adventurers and achievers. Track your progress and share it with friends, just like you would do with a physical map at your living room\s wall.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <LoadingContextProvider>{children}</LoadingContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
