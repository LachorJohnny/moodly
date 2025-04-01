import { Fugaz_One } from 'next/font/google';
import React from 'react';
import Button from './Button';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugazOne.className}>
        Log In / Register
      </h3>
      <p>You're one step away!</p>
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
         rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        type="text"
        placeholder="E-mail"
      />
      <input
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
         rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        type="password"
        placeholder="Password"
      />
      <div className="max-w-[400px] w-full mx-auto">
        <Button text="Submit" full />
      </div>
      <p className="text-center">
        Don't have an account? <span className="text-indigo-600">Sign up</span>
      </p>
    </div>
  );
}
