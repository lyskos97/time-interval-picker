/* @flow */

import * as React from 'react';
import fns from 'date-fns';

type Props = {
  time: Date,
};

export default class Timestamp extends React.Component<Props, void> {
  formatTime(d: Date): string {
    return fns.format(d, 'HH:mm');
  }

  render() {
    const { time } = this.props;

    return (
      <div className="cell">
        <span className="time">{this.formatTime(time)}</span>
      </div>
    );
  }
}
