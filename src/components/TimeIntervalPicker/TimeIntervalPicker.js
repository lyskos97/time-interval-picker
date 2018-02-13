/* @flow */
/* eslint-disable */

import * as React from 'react';
import Timestamp from '../Timestamp/Timestamp';
import fns from 'date-fns';

type Props = {|
  minTime: Date,
  maxTime: Date,
  step: number,
  busyTime: Array<Array<Date>>,
  selectedTime: Array<Array<Date>>,
  // setTime: () => Array<Date>,
|};

type Stamp = {|
  value: Date,
  status: 'selected' | 'active' | 'inactive',
|};

type State = {
  stamps: Array<Stamp>,
};

/* const samples = [
  new Date(0, 0, 1, 9, 0),
  new Date(0, 0, 1, 9, 30),
  new Date(0, 0, 1, 10, 0),
  new Date(0, 0, 1, 10, 30),
  new Date(0, 0, 1, 11, 0),
  new Date(0, 0, 1, 11, 30),
  new Date(0, 0, 1, 12, 0),
];
 */

export default class TimeIntervalPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { minTime, maxTime, step, selectedTime, busyTime } = props;

    const diffInMinutes = (maxTime.getTime() - minTime.getTime()) / 60000;
    const stampsNo = diffInMinutes / step;
    const stepMillis = step * 60000;
    const stamps: Array<Stamp> = [];

    for (let i = 0; i <= stampsNo; i++) {
      const nextDate = new Date(minTime.getTime() + stepMillis * i);

      if (this.isSelected(nextDate)) {
        stamps.push({ value: nextDate, status: 'selected' });
      } else if (this.isActive(nextDate)) {
        stamps.push({ value: nextDate, status: 'active' });
      } else {
        stamps.push({ value: nextDate, status: 'inactive' });
      }
    }

    console.log('stamps', stamps);
    this.state = { stamps };
  }

  // TODO: merge `isActive()` and `isSelected()` into `belongsTo()`
  isActive(nextDate: Date): boolean {
    const { busyTime } = this.props;
    let active = true;

    busyTime.forEach(elArr => {
      if (nextDate.getTime() >= elArr[0].getTime() && nextDate.getTime() <= elArr[1].getTime()) {
        active = false;
      }
    });

    return active;
  }

  isSelected(nextDate: Date): boolean {
    const { selectedTime } = this.props;
    let selected = false;

    selectedTime.forEach(elArr => {
      if (nextDate.getTime() >= elArr[0].getTime() && nextDate.getTime() <= elArr[1].getTime()) {
        selected = true;
      }
    });

    return selected;
  }

  render() {
    const { stamps } = this.state;

    return (
      <div className="wrapper">
        <h3 className="picker-header">React timespan picker</h3>
        <div className="picker">
          {stamps.map((el, i) => {
            return <Timestamp key={i} time={el.value} status={el.status} />;
          })}
        </div>
      </div>
    );
  }
}
