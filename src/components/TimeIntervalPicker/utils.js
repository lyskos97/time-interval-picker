/* @flow */

import { isWithinRange } from 'date-fns';

// TODO: `rangesArray` should have a type
export default function isWithinDateRanges(date: Date, rangesArray: Array<any>): boolean {
  let within = false;

  rangesArray.forEach(dateRange => {
    if (isWithinRange(date, ...dateRange)) within = true;
  });

  return within;
}
