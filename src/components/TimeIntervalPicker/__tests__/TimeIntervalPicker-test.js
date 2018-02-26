/* @flow */

import * as React from 'react';
import TimeIntervalPicker from '../TimeIntervalPicker';

describe('TimeIntervalPicker', () => {
  describe('render', () => {
    it('basic', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('has `busyTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2028, 0, 1, 9)}
          timeMax={new Date(2028, 0, 1, 18)}
          timeStep={30}
          busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('has `selectedTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2011, 0, 1, 9)}
          timeMax={new Date(2011, 0, 1, 18)}
          timeStep={30}
          selectedTime={[[new Date(2018, 0, 1, 16), new Date(2018, 0, 1, 17)]]}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('has `selectedTime` and `busyTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2012, 0, 1, 9)}
          timeMax={new Date(2012, 0, 1, 18)}
          timeStep={30}
          busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
          selectedTime={[[new Date(2018, 0, 1, 16), new Date(2018, 0, 1, 17)]]}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('has `selectedTime` and `busyTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2014, 0, 1, 9)}
          timeMax={new Date(2014, 0, 1, 18)}
          timeStep={30}
          busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
          selectedTime={[[new Date(2018, 0, 1, 16), new Date(2018, 0, 1, 17)]]}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('constructor()', () => {
    it('if `isSelected`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2015, 0, 1, 9)}
          timeMax={new Date(2015, 0, 1, 18)}
          timeStep={30}
          selectedTime={[[new Date(2018, 0, 1, 16), new Date(2018, 0, 1, 17)]]}
        />
      );

      expect(wrapper.state('stamps')).toMatchSnapshot();
    });

    it('if `isActive`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2016, 0, 1, 9)}
          timeMax={new Date(2016, 0, 1, 18)}
          timeStep={30}
          busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
        />
      );

      expect(wrapper.state('stamps')).toMatchSnapshot();
    });

    it('else', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2017, 0, 1, 9)}
          timeMax={new Date(2017, 0, 1, 18)}
          timeStep={30}
        />
      );

      expect(wrapper.state('stamps')).toMatchSnapshot();
    });
  });

  describe('isDisabled()', () => {
    describe('if `busyTime`', () => {
      it('if `nextDate` is within `busyTime`', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2019, 0, 1, 9)}
            timeMax={new Date(2019, 0, 1, 18)}
            timeStep={30}
            busyTime={[[new Date(2018, 0, 1, 13), new Date(2019, 0, 1, 14)]]}
          />
        );
        const active = wrapper.instance().isDisabled(new Date(2019, 0, 1, 13, 30));

        expect(active).toBe(true);
      });

      it('if `nextDate` is outside `busyTime`', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2119, 0, 1, 9)}
            timeMax={new Date(2119, 0, 1, 18)}
            timeStep={30}
            busyTime={[[new Date(2119, 0, 1, 13), new Date(2119, 0, 1, 14)]]}
          />
        );
        const active = wrapper.instance().isDisabled(new Date(2119, 0, 1, 15, 30));

        expect(active).toBe(false);
      });
    });

    it('if no `busyTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2111, 0, 1, 9)}
          timeMax={new Date(2111, 0, 1, 18)}
          timeStep={30}
        />
      );
      const active = wrapper.instance().isDisabled(new Date(2111, 0, 1, 15, 30));

      expect(active).toBe(false);
    });
  });

  describe('isSelected()', () => {
    describe('if `selectedTime`', () => {
      it('if `nextDate` is within `selectedTime`', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2018, 0, 1, 9)}
            timeMax={new Date(2018, 0, 1, 18)}
            timeStep={30}
            selectedTime={[[new Date(2018, 0, 1, 11), new Date(2018, 0, 1, 12)]]}
          />
        );
        const active = wrapper.instance().isSelected(new Date(2018, 0, 1, 11, 30));

        expect(active).toBe(true);
      });

      it('if `nextDate` is outside `selectedTime`', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2018, 0, 1, 9)}
            timeMax={new Date(2018, 0, 1, 18)}
            timeStep={30}
            selectedTime={[[new Date(2018, 0, 1, 11), new Date(2018, 0, 1, 12)]]}
          />
        );
        const active = wrapper.instance().isSelected(new Date(2018, 0, 1, 15, 30));

        expect(active).toBe(false);
      });
    });

    it('if no `selectedTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
        />
      );
      const active = wrapper.instance().isSelected(new Date(2018, 0, 1, 15, 30));

      expect(active).toBe(false);
    });
  });

  describe('multiselect', () => {
    it('false', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2551, 0, 1, 9)}
          timeMax={new Date(2551, 0, 1, 18)}
          timeStep={30}
          multiselect={false}
        />
      );

      wrapper.instance().onStampClick(1);
      wrapper.instance().onStampClick(4);

      expect(wrapper.state('selectedTime')).toHaveLength(1);
    });

    it('true', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
        />
      );

      wrapper.instance().onStampClick(1);
      wrapper.instance().onStampClick(2);
      wrapper.instance().onStampClick(3);
      wrapper.instance().onStampClick(1);

      expect(wrapper.state('selectedTime')).toHaveLength(2);
    });
  });

  describe('onStampClick()', () => {
    describe('at available', () => {
      it('with `onChange() callback`', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2115, 0, 1, 9)}
            timeMax={new Date(2115, 0, 1, 18)}
            timeStep={30}
            onChange={onChange}
          />
        );

        wrapper.instance().onStampClick(1);

        expect(wrapper.state('stamps')).toMatchSnapshot();
        expect(onChange).toHaveBeenCalledTimes(1);
      });

      it('without `onChange()` callback', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2001, 0, 1, 9)}
            timeMax={new Date(2001, 0, 1, 18)}
            timeStep={30}
          />
        );

        wrapper.instance().onStampClick(1);

        expect(wrapper.state('stamps')).toMatchSnapshot();
      });
    });

    describe('at selected', () => {
      it('with `onChange() callback`', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2002, 0, 1, 9)}
            timeMax={new Date(2002, 0, 1, 18)}
            timeStep={30}
            onChange={onChange}
          />
        );

        wrapper.instance().onStampClick(1);
        wrapper.instance().onStampClick(1);

        expect(wrapper.state('stamps')).toMatchSnapshot();
        expect(onChange).toHaveBeenCalledTimes(2);
      });

      it('without `onChange()` callback', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2003, 0, 1, 9)}
            timeMax={new Date(2003, 0, 1, 18)}
            timeStep={30}
          />
        );

        wrapper.instance().onStampClick(4);
        wrapper.instance().onStampClick(4);

        expect(wrapper.state('stamps')).toMatchSnapshot();
      });
    });

    describe('at disabled', () => {
      it('with `onChange() callback`', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2005, 0, 1, 9)}
            timeMax={new Date(2005, 0, 1, 18)}
            timeStep={30}
            onChange={onChange}
            busyTime={[[new Date(2005, 0, 1, 9, 30), new Date(2005, 0, 1, 10, 59)]]}
          />
        );

        wrapper.instance().onStampClick(5);
        wrapper.instance().onStampClick(2);

        expect(wrapper.state('stamps')).toMatchSnapshot();
        expect(onChange).toHaveBeenCalledTimes(1);
      });

      it('without `onChange()` callback', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2006, 0, 1, 9)}
            timeMax={new Date(2006, 0, 1, 18)}
            timeStep={30}
            busyTime={[[new Date(2006, 0, 1, 9, 30), new Date(2006, 0, 1, 10, 59)]]}
          />
        );

        wrapper.instance().onStampClick(1);
        wrapper.instance().onStampClick(2);

        expect(wrapper.state('stamps')).toMatchSnapshot();
      });
    });
  });
});
