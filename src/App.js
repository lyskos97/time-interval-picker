/* @flow */

import React from 'react';
// import fns from 'date-fns';
import TimeIntervalPicker from './components/TimeIntervalPicker';

type Props = {};

export default class App extends React.Component<Props, void> {
  cb = (value: Array<Date>) => {
    console.log(
      'callback invoked on',
      // fns.format(value[0], 'HH:mm'),
      // '-',
      // fns.format(value[1], 'HH:mm')
      value
    );
  };

  render() {
    return (
      <TimeIntervalPicker
        step={30}
        minTime={new Date(2018, 0, 1, 9)}
        maxTime={new Date(2018, 0, 1, 19)}
        selectedTime={[[new Date(2018, 0, 1, 15, 30), new Date(2018, 0, 1, 15, 59)]]}
        busyTime={[[new Date(2018, 0, 1, 12, 30), new Date(2018, 0, 1, 13, 30)]]}
        cb={this.cb}
      />
    );
  }
}
