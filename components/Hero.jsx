'use client';

import React from 'react';
import { motion } from 'motion/react';
import Calendar from './Calendar';
import CallToAction from './CallToAction';

export default function Hero(props) {
  const { fugazOne } = props;

  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugazOne}
      >
        <span className="textGradient">Moodly</span> helps you track your{' '}
        <span className="textGradient">daily</span> mood!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg sm:text-xl md:text-2xl text-center w-full max-w-[600px] mx-auto"
      >
        Create your mood record and see how you feel on{' '}
        <span className="font-semibold">every day of every year.</span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <CallToAction />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Calendar demo />
      </motion.div>
    </div>
  );
}
