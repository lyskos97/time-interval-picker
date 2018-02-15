/* @flow */

import * as React from 'react';
import Timestamp from '../Timestamp';

describe('Timestamp', () => {
  describe('render()', () => {
    it('basic', () => {
      const wrapper = shallow(<Timestamp value={new Date(2018, 0)} />);

      expect(wrapper).toMatchSnapshot();
    });

    it('status `selected`', () => {
      const wrapper = shallow(<Timestamp value={new Date(2018, 0)} status="selected" />);

      expect(wrapper).toMatchSnapshot();
    });

    it('status `disabled`', () => {
      const wrapper = shallow(<Timestamp value={new Date(2018, 0)} status="disabled" />);

      expect(wrapper).toMatchSnapshot();
    });

    it('status `available`', () => {
      const wrapper = shallow(<Timestamp value={new Date(2018, 0)} status="available" />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('formatTime()', () => {
    const time = new Date(2018, 0, 1, 13, 37);
    const wrapper = shallow(<Timestamp value={time} />);
    const formattedTime = wrapper.instance().formatTime(time);

    expect(formattedTime).toBe('13:37');
  });

  it('handleClick()', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(<Timestamp value={new Date(2018, 0)} handleClick={handleClick} />);
    wrapper.find('div').simulate('click');

    expect(handleClick).toBeCalled();
  });
});
