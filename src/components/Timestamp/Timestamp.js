/* @flow */
/* eslint-disable */

import * as React from 'react';
import fns from 'date-fns';

type Props = {
  time: Date,
  status: 'selected' | 'active' | 'inactive',
};

export default class Timestamp extends React.Component<Props, void> {
  formatTime(d: Date): string {
    return fns.format(d, 'HH:mm');
  }

  render() {
    const { time, status } = this.props;
    let classname = 'cell';

    console.log(time.toLocaleTimeString(), status);

    if (status === 'selected') classname += ' cellSelected';
    else if (status === 'inactive') classname += ' cellInactive';
    else classname += ' cellActive';

    return (
      <div className={classname}>
        <span className="time">{this.formatTime(time)}</span>
      </div>
    );
  }
}
