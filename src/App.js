/* @flow */

import React from 'react';
import TimeIntervalPicker from './components/TimeIntervalPicker/TimeIntervalPicker';

export default function App() {
  return (
    <TimeIntervalPicker
      step={30}
      minTime={new Date(2018, 0, 1, 9)}
      maxTime={new Date(2018, 0, 1, 19)}
    />
  );
}
