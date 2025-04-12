import { Fugaz_One } from 'next/font/google';
import React from 'react';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Button(props) {
  const { text, dark, full, clickHandler, google } = props;

  return (
    <button
      onClick={clickHandler}
      className={
        'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-indigo-600 ' +
        (dark ? 'text-white bg-indigo-600 border-indigo-600' : 'text-indigo-600 ') +
        (full ? 'grid place-items-center w-full' : '')
      }
    >
      <p
        className={
          'flex items-center justify-center px-6 sm:px-10 py-2 sm:py-3 whitespace-nowrap ' +
          fugazOne.className
        }
      >
        {google ? <i className="fa-brands fa-google px-2 sm:px-3 text-lg sm:text-xl" /> : ''}
        {text}
      </p>
    </button>
  );
}
