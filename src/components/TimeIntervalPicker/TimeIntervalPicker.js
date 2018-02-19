/* @flow */
/* eslint-disable react/no-array-index-key */

import * as React from 'react';
import { differenceInMinutes, addMinutes } from 'date-fns';
import Timestamp from './Timestamp';

export type DateRange = [Date, Date];

type Props = {|
  timeMin: Date,
  timeMax: Date,
  timeStep: number, // step in minutes
  serviceDuration?: number, // step in minutes, by default equal to timeStep // TODO
  multiselect?: boolean, // by default false // TODO
  busyTime?: Array<DateRange>,
  selectedTime?: Array<DateRange>,
  onChange?: (Array<DateRange>) => void,
|};

export type Stamp = {
  value: Date,
  status?: 'selected' | 'available' | 'disabled',
};

type State = {
  stamps: Array<Stamp>,
  selectedTime: Array<DateRange> | void,
};

export default class TimeIntervalPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { timeMin, timeMax, timeStep } = props;

    const diffInMinutes = differenceInMinutes(timeMax, timeMin);
    const stampsNo = diffInMinutes / timeStep;
    const stamps: Array<Stamp> = [];

    for (let i = 0; i <= stampsNo; i++) {
      const nextDate = addMinutes(timeMin, timeStep * i);

      if (this.isSelected(nextDate)) {
        stamps.push({ value: nextDate, status: 'selected' });
      } else if (this.isActive(nextDate)) {
        stamps.push({ value: nextDate, status: 'available' });
      } else {
        stamps.push({ value: nextDate, status: 'disabled' });
      }
    }

    this.state = { stamps, selectedTime: props.selectedTime };
  }

  // TODO: merge? `isActive()` and `isSelected()` into `belongsTo()?`
  isActive(nextDate: Date): boolean {
    const { busyTime } = this.props;
    let active = true;

    if (busyTime) {
      busyTime.forEach(elArr => {
        const [firstEl, secondEl] = elArr;

        if (nextDate.getTime() >= firstEl.getTime() && nextDate.getTime() <= secondEl.getTime()) {
          active = false;
        }
      });
    }

    return active;
  }

  isSelected(nextDate: Date): boolean {
    const { selectedTime } = this.props;
    let selected = false;

    if (selectedTime) {
      selectedTime.forEach(elArr => {
        if (nextDate.getTime() >= elArr[0].getTime() && nextDate.getTime() <= elArr[1].getTime()) {
          selected = true;
        }
      });
    }

    return selected;
  }

  // TODO: push only selected to `this.state.selectedTime`
  onStampClick(i: number) {
    const { selectedTime, stamps } = this.state;

    if (stamps[i].status === 'available') {
      stamps[i].status = 'selected';
    } else {
      stamps[i].status = 'available';
    }

    this.setState({ stamps }, () => {
      if (!selectedTime) return;
      const { onChange, timeStep } = this.props;
      const cbTime = selectedTime.slice();

      cbTime.push([stamps[i].value, addMinutes(stamps[i].value, timeStep - 1)]);

      this.setState({ selectedTime: cbTime }, () => {
        if (onChange) onChange(cbTime);
      });
    });
  }

  // getStampAdjacency(stamp: Stamp): -1 | 0 | 1 | 2 {
  //   const { selectedTime } = this.state;

  //   selectedTime.forEach(el => {
  //     differenceInMinutes();
  //   });

  //   return 0;
  // }

  render() {
    const { stamps } = this.state;

    return (
      <div className="wrapper">
        <h3 className="picker-header">React timestamps picker</h3>
        <div className="picker">
          {stamps.map((el, i) => (
            <Timestamp
              key={i}
              value={el.value}
              status={el.status}
              handleClick={() => {
                this.onStampClick(i);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
