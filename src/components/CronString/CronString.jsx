import { useSelector } from 'react-redux';
import { useRange } from '../../hooks/useRange';

export const CronString = () => {
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

  const cronString = [
    cronInterval(minutesIntervalValue, minutesCron),
    cronInterval(hoursIntervalValue, hoursCron),
    cronInterval(monthdaysIntervalValue, monthdaysCron),
    cronInterval(monthsIntervalValue, monthsCron),
    cronInterval(weekdaysIntervalValue, weekdaysCron),
  ].join(' ');

  return (
    <div>
      <h2>CronString</h2>
      <div>{cronString}</div>
    </div>
  );
};
