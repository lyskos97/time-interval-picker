/* @flow */
/* eslint-disable no-console */
import * as React from 'react';
import Timestamp from '../Timestamp/Timestamp';

type Props = {|
  minTime: Date,
  maxTime: Date,
  step: number,
  // busyTime: Array<Array<Date>>,
  // selectedTime: Array<Array<Date>>,
  // setTime: () => Array<Date>,
|};

// type cellState = 'selected' | 'active' | 'inactive';

const samples = [
  new Date(0, 0, 1, 9, 0),
  new Date(0, 0, 1, 9, 30),
  new Date(0, 0, 1, 10, 0),
  new Date(0, 0, 1, 10, 30),
  new Date(0, 0, 1, 11, 0),
  new Date(0, 0, 1, 11, 30),
  new Date(0, 0, 1, 12, 0),
];

export default class TimeIntervalPicker extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
    console.log('object');
  }

  render() {
    return (
      <div className="wrapper">
        <h3 className="picker-header">React timespan picker</h3>
        <div className="picker">{samples.map(el => <Timestamp time={el} />)}</div>
      </div>
    );
  }
}
