'use client';

import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  const { signup, login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }

    setAuthenticating(true);
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          return;
        }
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugazOne.className}>
        {!isRegister ? 'Log In' : 'Register'}
      </h3>
      <p>You're one step away!</p>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
         rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        type="text"
        placeholder="E-mail"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
         rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        type="password"
        placeholder="Password"
      />
      {isRegister ? (
        <input
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
           rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
          type="password"
          placeholder="Confirm Password"
        />
      ) : (
        ''
      )}
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? 'Submitting...' : 'Submit'}
          full
        />
      </div>
      <p className="text-center">
        {!isRegister ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-600">
          {!isRegister ? 'Sign up' : 'Sign in'}
        </button>
      </p>
      <div className="flex items-center w-full max-w-[400px] mx-auto py-2 gap-3">
        <div className="h-px bg-gray-300 flex-1" />
        <span className="text-sm text-gray-400 whitespace-nowrap">or</span>
        <div className="h-px bg-gray-300 flex-1" />
      </div>
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          clickHandler={loginWithGoogle}
          text={!isRegister ? 'Sign in with Google' : 'Sign up with Google'}
          full
          dark
          google
        />
      </div>
    </div>
  );
}
