/* @flow */

import React from 'react';
import TimeIntervalPicker from './components/TimeIntervalPicker/TimeIntervalPicker';

export default function App() {
  return (
    <TimeIntervalPicker
      step={30}
      minTime={new Date(2018, 0, 1, 9)}
      maxTime={new Date(2018, 0, 1, 19)}
      selectedTime={[[new Date(2018, 0, 1, 15, 30), new Date(2018, 0, 1, 16, 30)]]}
      busyTime={[[new Date(2018, 0, 1, 12, 30), new Date(2018, 0, 1, 13, 30)]]}
    />
  );
}
