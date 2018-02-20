/* @flow */
/* eslint-disable react/no-array-index-key */

import * as React from 'react';
import { differenceInMinutes, addMinutes, isWithinRange } from 'date-fns';
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

    this.state = { selectedTime: props.selectedTime, stamps: [] };

    const stamps = this.getStampsFromProps();

    // double assigning for proper work of `this.isSelected()`
    this.state = { stamps, selectedTime: props.selectedTime };
  }

  getStampsFromProps(): Array<Stamp> {
    const { timeMin, timeMax, timeStep } = this.props;
    const stamps: Array<Stamp> = [];
    const diffInMinutes = differenceInMinutes(timeMax, timeMin);
    const stampsNumber = diffInMinutes / timeStep;

    for (let i = 0; i < stampsNumber; i++) {
      const nextDate = addMinutes(timeMin, timeStep * i);

      if (this.isSelected(nextDate)) {
        stamps.push({ value: nextDate, status: 'selected' });
      } else if (this.isDisabled(nextDate)) {
        stamps.push({ value: nextDate, status: 'available' });
      } else {
        stamps.push({ value: nextDate, status: 'disabled' });
      }
    }

    return stamps;
  }

  isDisabled(nextDate: Date): boolean {
    const { busyTime } = this.props;
    let disabled = false;

    if (busyTime) {
      busyTime.forEach(datePair => {
        if (isWithinRange(nextDate, ...datePair)) disabled = true;
      });
    }

    return disabled;
  }

  isSelected(nextDate: Date): boolean {
    const { selectedTime } = this.state;
    let selected = false;

    if (selectedTime) {
      selectedTime.forEach(datePair => {
        if (isWithinRange(nextDate, ...datePair)) selected = true;
      });
    }

    return selected;
  }

  // TODO: remove redundant
  isSelectedState(nextDate: Date): boolean {
    const { selectedTime } = this.state;
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

  onStampClick2(i: number) {
    const { selectedTime = [], stamps } = this.state;
    const { onChange, timeStep } = this.props;
    // const cbTime = selectedTime.slice();

    if (stamps[i].status === 'available') {
      stamps[i].status = 'selected';
      selectedTime.push([stamps[i].value, addMinutes(stamps[i].value, timeStep - 1)]);
    } else if (stamps[i].status === 'selected') {
      stamps[i].status = 'available';
      const selectedIndex = selectedTime.findIndex(() => this.isSelected(stamps[i].value));
      console.log('selectedTime before', selectedTime);
      selectedTime.splice(selectedIndex, 0);
      console.log('selectedTime after', selectedTime);
    } else return;

    this.setState({ stamps, selectedTime }, () => {
      if (onChange) onChange(selectedTime);
    });
  }

  render() {
    const { stamps } = this.state;

    return (
      <div className="wrapper">
        <h3 className="picker-header">React timespan picker</h3>
        <div className="picker">
          {stamps.map((el, i) => (
            <Timestamp
              key={i}
              value={el.value}
              status={el.status}
              handleClick={() => {
                this.onStampClick2(i);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
