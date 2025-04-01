import { Fugaz_One } from 'next/font/google';
import React from 'react';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Button(props) {
  const { text, dark, full } = props;

  return (
    <button
      className={
        'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-indigo-600 ' +
        (dark ? 'text-white bg-indigo-600 border-indigo-600' : 'text-indigo-600 ') +
        (full ? 'grid place-items-center w-full' : '')
      }
    >
      <p className={'px-6 sm:px-10 py-2 sm:py-3 whitespace-nowrap ' + fugazOne.className}>{text}</p>
    </button>
  );
}
