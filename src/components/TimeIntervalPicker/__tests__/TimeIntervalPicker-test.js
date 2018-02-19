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
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
          busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('has `selectedTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
          selectedTime={[[new Date(2018, 0, 1, 16), new Date(2018, 0, 1, 17)]]}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('has `selectedTime` and `busyTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
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
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
          selectedTime={[[new Date(2018, 0, 1, 16), new Date(2018, 0, 1, 17)]]}
        />
      );

      expect(wrapper.state('stamps')).toMatchSnapshot();
    });

    it('if `isActive`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
          busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
        />
      );

      expect(wrapper.state('stamps')).toMatchSnapshot();
    });

    it('else', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
        />
      );

      expect(wrapper.state('stamps')).toMatchSnapshot();
    });
  });

  describe('isActive()', () => {
    describe('if `busyTime`', () => {
      it('if `nextDate` is within `busyTime`', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2018, 0, 1, 9)}
            timeMax={new Date(2018, 0, 1, 18)}
            timeStep={30}
            busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
          />
        );
        const active = wrapper.instance().isActive(new Date(2018, 0, 1, 13, 30));

        expect(active).toBe(false);
      });

      it('if `nextDate` is outside `busyTime`', () => {
        const wrapper = shallow(
          <TimeIntervalPicker
            timeMin={new Date(2018, 0, 1, 9)}
            timeMax={new Date(2018, 0, 1, 18)}
            timeStep={30}
            busyTime={[[new Date(2018, 0, 1, 13), new Date(2018, 0, 1, 14)]]}
          />
        );
        const active = wrapper.instance().isActive(new Date(2018, 0, 1, 15, 30));

        expect(active).toBe(true);
      });
    });

    it('if no `busyTime`', () => {
      const wrapper = shallow(
        <TimeIntervalPicker
          timeMin={new Date(2018, 0, 1, 9)}
          timeMax={new Date(2018, 0, 1, 18)}
          timeStep={30}
        />
      );
      const active = wrapper.instance().isActive(new Date(2018, 0, 1, 15, 30));

      expect(active).toBe(true);
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
});
