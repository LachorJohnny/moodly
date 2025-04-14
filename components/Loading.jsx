'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center items-center gap-2 h-full">
      {[1, 2, 3].map((i) => {
        return (
          <motion.span
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-500 dark:bg-indigo-300 rounded-full"
            animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
