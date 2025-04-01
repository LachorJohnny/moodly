import { Fugaz_One } from 'next/font/google';
import React from 'react';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: '11:26:34',
    date: new Date().toDateString(),
  };

  const moods = {
    '&*@#$': '😭',
    Sad: '🥲',
    Existing: '😶',
    Good: '😊',
    Elated: '😍',
  };

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-sm truncate">
                {status.replaceAll('_', ' ')}
              </p>
              <p className={'text-base sm:text-lg truncate ' + fugazOne.className}>
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugazOne.className}>
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              key={moodIndex}
              className="flex flex-col items-center flex-1 gap-2 p-4 px-5 bg-indigo-50 rounded-2xl 
              purpleShadow duration-200 hover:bg-[lavender] text-center"
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
              <p
                className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugazOne.className}
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
