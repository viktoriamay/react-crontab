import { useDispatch } from 'react-redux';
import { clearIntervalValue } from '../../storage/actions/intervalActions';
import { HoursInterval } from '../Intervals/HoursInterval';
import { MinutesInterval } from '../Intervals/MinutesInterval';
import { MonthdaysInterval } from '../Intervals/MonthdaysInterval';
import { MonthsInterval } from '../Intervals/MonthsInterval';
import { WeekdaysInterval } from '../Intervals/WeekdaysInterval';
import { Monthdays } from '../Monthdays/Monthdays';
import { Months } from '../Months/Months';
import { Time } from '../Time/Time';
import { Weekdays } from '../Weekdays/Weekdays';
import { clearMonthdaysValue } from '../../storage/actions/monthdaysActions';
import { clearMinutesValue } from '../../storage/actions/minutesActions';
import { clearHoursValue } from '../../storage/actions/hoursActions';
import { clearMonthsValue } from '../../storage/actions/monthsActions';
import { clearWeekdayValue } from '../../storage/actions/weekdaysActions';

export const CustomSchedule = () => {
  const dispatch = useDispatch();

  const handleClearSchedule = () => {
    dispatch(clearIntervalValue());
    dispatch(clearMinutesValue());
    dispatch(clearHoursValue());
    dispatch(clearMonthdaysValue());
    dispatch(clearMonthsValue());
    dispatch(clearWeekdayValue());
  };

  return (
    <div>
      <h2>Custom Schedule</h2>
      <MinutesInterval />
      <HoursInterval />
      <WeekdaysInterval />
      <MonthdaysInterval />
      <MonthsInterval />
      <Time />
      <Weekdays />
      <Months />
      <Monthdays />
      <button onClick={handleClearSchedule}>Clear Schedule</button>
    </div>
  );
};
