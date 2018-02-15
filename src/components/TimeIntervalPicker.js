/* @flow */

import * as React from 'react';
import { differenceInMinutes, addMinutes } from 'date-fns';
import Timestamp from './Timestamp';

type Props = {|
  minTime: Date,
  maxTime: Date,
  step: number,
  busyTime?: Array<Array<Date>>,
  selectedTime?: Array<Array<Date>>,
  cb?: (Array<Date>) => void,
|};

export type Stamp = {
  value: Date,
  status?: 'selected' | 'available' | 'disabled',
};

type State = {
  stamps: Array<Stamp>,
  selectedTime: Array<Array<Date>>,
};

export default class TimeIntervalPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { minTime, maxTime, step } = props;

    const diffInMinutes = differenceInMinutes(maxTime, minTime);
    const stampsNo = diffInMinutes / step;
    const stamps: Array<Stamp> = [];

    for (let i = 0; i <= stampsNo; i++) {
      const nextDate = addMinutes(minTime, step * i);

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

  // TODO: merge? `isActive()` and `isSelected()` into `belongsTo()`
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

  selectTime(i: number) {
    const { selectedTime, stamps } = this.state;

    if (stamps[i].status === 'available') stamps[i].status = 'selected';
    else stamps[i].status = 'available';

    this.setState({ stamps }, () => {
      const { cb, step } = this.props;
      const cbTime = selectedTime.slice();

      cbTime.push([stamps[i].value, addMinutes(stamps[i].value, step - 1)]);
      this.setState({ selectedTime: cbTime }, () => {
        if (cb) cb(cbTime);
      });
    });
  }

  render() {
    const { stamps } = this.state;

    console.log('stamps', stamps);

    /* eslint-disable */
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
                this.selectTime(i);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
