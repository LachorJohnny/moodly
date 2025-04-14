'use client';

import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  const { signup, login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (mode === 'register') {
      setIsRegister(true);
    } else if (mode === 'login') {
      setIsRegister(false);
    }
  }, [mode]);

  async function handleSubmit() {
    if (!email || !password) {
      return setError('Please fill in all fields.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (isRegister && password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setAuthenticating(true);
    setError(null);
    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      // Firebase errors
      let message = err.message || 'An unexpected error occurred.';
      if (message.includes('auth/invalid-credential')) {
        message = 'Invalid email or password.';
      } else if (message.includes('auth/invalid-email')) {
        message = 'Invalid email address.';
      } else if (message.includes('auth/email-already-in-use')) {
        message = 'This email is already in use.';
      }
      setError(message);
    } finally {
      setAuthenticating(false);
    }
  }

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 6000);
    }
    return (timeout) => clearTimeout(timeout);
  }, [error]);

  return (
    <motion.div layout className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugazOne.className}>
        {!isRegister ? 'Log In' : 'Register'}
      </h3>
      <p>You're one step away!</p>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
         rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600 text-base"
        type="text"
        placeholder="E-mail"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
         rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600 text-base"
        type="password"
        placeholder="Password"
      />
      {isRegister && (
        <input
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400
           rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600 text-base"
          type="password"
          placeholder="Confirm Password"
        />
      )}
      <div className="max-w-[400px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? 'Submitting...' : 'Submit'}
          full
        />
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden w-full max-w-[400px] mx-auto"
          >
            <div className="py-2 sm:py-3 px-4 text-red-500 bg-red-50 text-sm text-center rounded-lg">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    </motion.div>
  );
}
