'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gradients, baseRating } from '@/utils';
import { Fugaz_One } from 'next/font/google';

const fugazOne = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

const months = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sept',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};
const monthsArr = Object.keys(months);
const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Calendar(props) {
  const { demo, completeData, handleSetMood } = props;

  const now = new Date();
  const currentMonth = now.getMonth();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currentMonth]);

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1);
  let firstDayOfMonth = monthNow.getDay();
  firstDayOfMonth = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(selectedYear, monthsArr.indexOf(selectedMonth) + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => handleIncrementMonth(-1)}
          className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-left" />
        </button>
        <p
          className={
            'text-center capitalize whitespace-nowrap textGradient col-span-3 ' + fugazOne.className
          }
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => handleIncrementMonth(+1)}
          className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <i className="fa-solid fa-circle-chevron-right" />
        </button>
      </div>

      <div className="flex flex-col overflow-visible gap-1 py-4 sm:py-6 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedMonth}-${selectedYear}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col gap-1"
          >
            {[...Array(numRows).keys()].map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-7 gap-1">
                {dayList.map((_, dayOfWeekIndex) => {
                  const dayIndex = rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                  const dayDisplay =
                    dayIndex > daysInMonth
                      ? false
                      : rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth
                      ? false
                      : true;

                  const isToday =
                    dayIndex === now.getDate() &&
                    selectedMonth === monthsArr[now.getMonth()] &&
                    selectedYear === now.getFullYear();

                  if (!dayDisplay) {
                    return <div key={dayOfWeekIndex} className="bg-transparent" />;
                  }

                  const color = demo
                    ? gradients.indigo[baseRating[dayIndex]]
                    : dayIndex in data
                    ? gradients.indigo[data[dayIndex]]
                    : 'white';

                  return (
                    <motion.div
                      key={dayOfWeekIndex}
                      layout
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ background: color }}
                      className={
                        'relative text-xs sm:text-sm border border-solid p-2 flex items-center justify-between gap-2 rounded-lg overflow-hidden ' +
                        (isToday ? ' border-indigo-400' : ' border-indigo-100') +
                        (color === 'white' ? ' text-indigo-400' : ' text-white')
                      }
                    >
                      {isToday && (
                        <motion.div
                          className="absolute inset-0 rounded-lg border-2 border-indigo-400 z-0"
                          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                      <p className="z-10">{dayIndex}</p>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
