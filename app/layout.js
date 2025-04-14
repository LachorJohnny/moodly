import { Fugaz_One, Open_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import Head from './head';
import Logout from '@/components/Logout';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Moodly',
  description: 'Track your daily mood every day of the year!',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={`w-full max-w-[1000px] min-h-screen mx-auto text-sm sm:text-base
          flex flex-col text-slate-800 ${openSans.className}`}
        >
          <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
            <Link href={'/'}>
              <h1 className={'text-base sm:text-lg textGradient ' + fugazOne.className}>Moodly</h1>
            </Link>
            <Logout />
          </header>
          {children}
          <footer className="p-4 sm:p-8 grid place-items-center">
            <p className={'text-indigo-500 ' + fugazOne.className}>Created with 🩵</p>
          </footer>
        </body>
      </AuthProvider>
    </html>
  );
}
