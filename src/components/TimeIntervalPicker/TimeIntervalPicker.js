/* @flow */
/* eslint-disable react/no-array-index-key, react/no-unused-state */

import * as React from 'react';
import { differenceInMinutes, addMinutes, isWithinRange, subMinutes } from 'date-fns';
import Timestamp from './Timestamp';
import isWithinDateRanges from './utils';

export type DateRange = [Date, Date];

type Props = {|
  timeMin: Date,
  timeMax: Date,
  timeStep: number, // step in minutes
  eventDuration?: number, // step in minutes, by default equal to timeStep // TODO
  busyTime?: Array<DateRange>,
  selectedTime?: DateRange,
  onChange?: DateRange => void,
|};

export type Stamp = {
  value: Date,
  status?: 'selected' | 'available' | 'disabled' | 'reserved',
};

type State = {
  stamps: Array<Stamp>,
  selectedTime?: DateRange,
};

export default class TimeIntervalPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { selectedTime: props.selectedTime, stamps: [] };

    const stamps = this.getDefaultStamps();

    // double assigning for proper work of `this.isSelected()` which depends on props only
    this.state = { selectedTime: props.selectedTime, stamps };
  }

  getDefaultStamps(): Array<Stamp> {
    const { timeMin, timeMax, timeStep, busyTime = [] } = this.props;
    const { selectedTime = [] } = this.state;

    const stamps: Array<Stamp> = [];
    const diffInMinutes = differenceInMinutes(timeMax, timeMin);
    const stampsNumber = diffInMinutes / timeStep;

    for (let i = 0; i < stampsNumber; i++) {
      const nextDate = addMinutes(timeMin, timeStep * i);

      if (isWithinRange(nextDate, ...selectedTime)) {
        stamps.push({ value: nextDate, status: 'selected' });
      } else if (!this.isSuitable(nextDate)) {
        stamps.push({ value: nextDate, status: 'reserved' });
      } else if (isWithinDateRanges(nextDate, busyTime) || !this.isSuitable(nextDate)) {
        stamps.push({ value: nextDate, status: 'disabled' });
      } else {
        stamps.push({ value: nextDate, status: 'available' });
      }
    }

    return stamps;
  }

  isSuitable(date: Date): boolean {
    const { timeMax, timeStep, eventDuration = timeStep } = this.props;
    let suitable = true;

    const lim = subMinutes(timeMax, eventDuration);

    if (isWithinRange(date, lim, timeMax)) suitable = false;

    return suitable;
  }

  // TODO: should not grab following disabled stamps
  onStampClick(i: number) {
    const { onChange, timeStep, eventDuration = timeStep } = this.props;
    let { stamps } = this.state;
    // const { busyTime = [] } = this.props;
    const eventStart = stamps[i].value;
    let eventEnd;

    // calc `eventEnd` from `eventStart` and `eventDuration` & `timeStep`
    if (eventDuration === timeStep) eventEnd = addMinutes(eventStart, eventDuration);
    else
      eventEnd = addMinutes(eventStart, eventDuration + (timeStep - eventDuration % timeStep) - 1);

    const selectedTime = [eventStart, eventEnd];

    stamps = stamps.map(el => {
      const { value } = el;
      let { status } = el;

      if (isWithinRange(value, eventStart, eventEnd) && status !== 'disabled') status = 'selected';
      else if (status === 'selected') status = 'available';

      return { value, status };
    });

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
                this.onStampClick(i);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
