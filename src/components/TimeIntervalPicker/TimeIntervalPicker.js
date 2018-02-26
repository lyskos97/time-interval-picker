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
  selectedTime?: Array<DateRange>,
};

export default class TimeIntervalPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { selectedTime: props.selectedTime, stamps: [] };

    const stamps = this.getStampsFromProps();

    // double assigning for proper work of `this.isSelected()` which depends on props only
    this.state = { selectedTime: props.selectedTime, stamps };
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
        stamps.push({ value: nextDate, status: 'disabled' });
      } else {
        stamps.push({ value: nextDate, status: 'available' });
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

  onStampClick(i: number) {
    const { onChange, multiselect = true } = this.props;

    let selectedTimeAndStamps;

    if (multiselect) {
      selectedTimeAndStamps = this.handleMulticlick(i);
    } else {
      selectedTimeAndStamps = this.handleSingleclick(i);
    }

    this.setState(selectedTimeAndStamps, () => {
      const { selectedTime } = selectedTimeAndStamps;

      if (onChange) onChange(selectedTime);
    });
  }

  handleSingleclick(i: number): { selectedTime: Array<DateRange>, stamps: Array<Stamp> } {
    let { selectedTime = [], stamps } = this.state;
    const { timeStep } = this.props;

    // reset available stamps
    stamps = stamps.map(el => {
      let { status } = el;
      const { value } = el;

      if (status === 'selected') status = 'available';

      return { status, value };
    });

    stamps[i].status = 'selected';

    selectedTime = [[stamps[i].value, addMinutes(stamps[i].value, timeStep - 1)]];

    return { selectedTime, stamps };
  }

  handleMulticlick(i: number): { selectedTime: Array<DateRange>, stamps: Array<Stamp> } {
    const { selectedTime = [], stamps } = this.state;
    const { timeStep } = this.props;

    if (stamps[i].status === 'available') {
      stamps[i].status = 'selected';
      selectedTime.push([stamps[i].value, addMinutes(stamps[i].value, timeStep - 1)]);
    } else if (stamps[i].status === 'selected') {
      stamps[i].status = 'available';
      const selectedIndex = selectedTime.findIndex(() => this.isSelected(stamps[i].value));
      selectedTime.splice(selectedIndex, 1);
    }

    return { selectedTime, stamps };
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
                this.onStampClick(i);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
