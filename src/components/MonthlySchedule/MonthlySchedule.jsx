import { useSelector } from 'react-redux';
import { Monthdays } from '../Monthdays/Monthdays';
import { Months } from '../Months/Months';
import { Time } from '../Time/Time';

export const MonthlySchedule = () => {
  
  const selectedMonths = useSelector(
    (state) => state.monthsOptions.selectedMonths
  );

  const selectedHours = useSelector(
    (state) => state.hoursOptions.selectedHours
  );

  const selectedMinutes = useSelector(
    (state) => state.minutesOptions.selectedMinutes
  );
  const selectedMonthdays = useSelector(
    (state) => state.monthdaysOptions.selectedMonthdays
  );

  const monthsString =
    selectedMonths.length === 0 || selectedMonths.length === 12
      ? 'months'
      : selectedMonths.map((month) => month.name).join(', ');

  const daysString =
    selectedMonthdays.length === 0 || selectedMonthdays.length === 31
      ? 'days'
      : selectedMonthdays.map((month) => month.name).join(', ') + ' day of';

  const hoursString =
    selectedHours.length === 0 || selectedHours.length === 23
      ? 'every hour'
      : selectedHours.map((hour) => hour.title).join(', ') + ' hours';

  const minutesString =
    selectedMinutes.length === 0 || selectedMinutes.length === 59
      ? 'every minute'
      : selectedMinutes.map((minute) => minute.title).join(', ') + ' minutes';

  return (
    <div className="content">
      <h2 className="content__title">
        Every {daysString} every {monthsString} at {hoursString} and{' '}
        {minutesString}
      </h2>
      <Months />
      <Monthdays />
      <Time />
    </div>
  );
};
