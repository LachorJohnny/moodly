import Button from '@/components/Button';
import Main from '@/components/Main';
import { Fugaz_One } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function NotFound() {
  return (
    <Main>
      <div className="flex flex-col flex-1 items-center justify-center text-center gap-4 sm:gap-6">
        <h1
          className={
            'text-6xl sm:text-7xl md:text-8xl font-bold text-indigo-400 ' + fugazOne.className
          }
        >
          404
        </h1>
        <h2 className={'text-3xl sm:4xl md:text-5xl font-bold ' + fugazOne.className}>
          Page not found
        </h2>
        <p className="text-muted-foreground max-w-md">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href={'/'}>
          <Button text={<i className="fa-solid fa-arrow-left" />} />
        </Link>
      </div>
    </Main>
  );
}
