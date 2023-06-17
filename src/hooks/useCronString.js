import { useSelector } from 'react-redux';
import { useRange } from './useRange';

export const useCronString = () => {
  const cronInterval = (interval, minute) => {
    if (minute && interval) {
      return `*/${interval}`;
    } else if (minute) {
      return minute;
    } else if (interval > 0) {
      return `*/${interval}`;
    } else {
      return '*';
    }
  };

  const minutesIntervalValue = useSelector(
    (state) => +state.interval.minutesIntervalValue
  );
  const hoursIntervalValue = useSelector(
    (state) => +state.interval.hoursIntervalValue
  );
  const weekdaysIntervalValue = useSelector(
    (state) => +state.interval.weekdaysIntervalValue
  );
  const monthdaysIntervalValue = useSelector(
    (state) => +state.interval.monthdaysIntervalValue
  );
  const monthsIntervalValue = useSelector(
    (state) => +state.interval.monthsIntervalValue
  );

  const minutesValue = useSelector(
    (state) => state.minutesOptions.selectedMinutes
  );
  const hoursValue = useSelector((state) => state.hoursOptions.selectedHours);
  const weekdaysValue = useSelector(
    (state) => state.weekdayOptions.selectedWeekdays
  );
  const monthdaysValue = useSelector(
    (state) => state.monthdaysOptions.selectedMonthdays
  );
  const monthsValue = useSelector(
    (state) => state.monthsOptions.selectedMonths
  );

  const minutesCron = useRange(minutesValue);
  const hoursCron = useRange(hoursValue);
  const monthdaysCron = useRange(monthdaysValue);
  const monthsCron = useRange(monthsValue);
  const weekdaysCron = useRange(weekdaysValue);

  const minutesCronValue = cronInterval(minutesIntervalValue, minutesCron);
  const hoursCronValue = cronInterval(hoursIntervalValue, hoursCron);
  const monthdaysCronValue = cronInterval(
    monthdaysIntervalValue,
    monthdaysCron
  );
  const monthsCronValue = cronInterval(monthsIntervalValue, monthsCron);
  const weekdaysCronValue = cronInterval(weekdaysIntervalValue, weekdaysCron);

  const cronString = [
    minutesCronValue,
    hoursCronValue,
    monthdaysCronValue,
    monthsCronValue,
    weekdaysCronValue,
  ].join(' ');

  return {
    minutesCronValue,
    hoursCronValue,
    monthdaysCronValue,
    monthsCronValue,
    weekdaysCronValue,
    cronString,
  };
};
