import { Fugaz_One } from 'next/font/google';
import './globals.css';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: 'Moodly',
  description: 'Track your daily mood every day of the year!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`w-full w-max-[1000px] min-h-screen mx-auto text-sm sm:text-base
         flex flex-col antialiased`}
      >
        <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
          <h1 className={'text-base sm:text-lg textGradient ' + fugazOne.className}>Moodly</h1>
        </header>
        {children}
        <footer className='p-4 sm:p-8'>footer</footer>
      </body>
    </html>
  );
}
