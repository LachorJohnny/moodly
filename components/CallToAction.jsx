'use client';

import Link from 'next/link';
import React from 'react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

export default function CallToAction() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="max-w-[600px] w-full mx-auto">
        <Link href={'/dashboard'}>
          <Button text="Go to dashboard" dark full />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={'/dashboard?mode=register'}>
        <Button text="Sign Up" />
      </Link>
      <Link href={'/dashboard?mode=login'}>
        <Button text="Login" dark />
      </Link>
    </div>
  );
}
