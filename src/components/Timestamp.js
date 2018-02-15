/* @flow */
/* eslint-disabl */

import * as React from 'react';
import fns from 'date-fns';
import { type Stamp } from './TimeIntervalPicker';

type Props = {
  handleClick?: () => void,
} & Stamp;

export default class Timestamp extends React.Component<Props, void> {
  formatTime(d: Date): string {
    return fns.format(d, 'HH:mm');
  }

  handleClick = () => {
    const { handleClick } = this.props;

    if (handleClick) {
      handleClick();
    }
  };

  render() {
    const { value, status } = this.props;
    let classname = 'cell';

    if (status === 'selected') classname += ' cellSelected';
    else if (status === 'disabled') classname += ' cellInactive';
    else classname += ' cellActive';

    return (
      <div className={classname} onClick={this.handleClick}>
        <span className="time">{this.formatTime(value)}</span>
      </div>
    );
  }
}
