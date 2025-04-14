'use client';

import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  function countValues() {
    let totalNumOfDays = 0;
    let sumMoods = 0;

    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          const daysMood = data[year][month][day];
          totalNumOfDays++;
          sumMoods += daysMood;
        }
      }
    }

    const average = sumMoods / totalNumOfDays;

    return { num_days: totalNumOfDays, average_mood: parseFloat(average.toFixed(1)) };
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood) {
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;
      // update the current state
      setData(newData);
      // update the global state
      setUserDataObj(newData);
      // update firestore
      const docRef = doc(db, 'users', currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true },
      );
    } catch (err) {
      console.error('Failed to set data: ', err.message);
    }
  }

  const moods = {
    '&*@#$': '😭',
    Sad: '🥲',
    Existing: '😶',
    Good: '😊',
    Elated: '😍',
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }

    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
              <p className="font-medium capitalize text-xs sm:text-sm truncate">
                {status.replaceAll('_', ' ')}
              </p>
              <p className={'text-base sm:text-lg truncate ' + fugazOne.className}>
                {statuses[status]}
                {status === 'num_days' ? ' 🔥' : ''}
              </p>
            </div>
          );
        })}
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugazOne.className}>
        How do you{' '}
        <motion.span
          className="textGradient inline-block pb-3 pl-0.5"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          feel
        </motion.span>{' '}
        today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleSetMood(currentMoodValue);
              }}
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
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
