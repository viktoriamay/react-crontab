import { useSelector } from 'react-redux';
import { hours, minutes, weekDays } from '../../data/data';
import { Weekdays } from '../Weekdays/Weekdays';
import { Time } from '../Time/Time';

export const WeeklySchedule = () => {
  const selectedWeekdays = useSelector(
    (state) => state.weekdayOptions.selectedWeekdays
  );

  const selectedHours = useSelector(
    (state) => state.hoursOptions.selectedHours
  );

  const selectedMinutes = useSelector(
    (state) => state.minutesOptions.selectedMinutes
  );

  const weekDaysString =
    selectedWeekdays.length === 0 || selectedWeekdays.length === 7
      ? 'weekday'
      : selectedWeekdays.map((weekday) => weekday.name).join(', ');

  const hoursString =
    selectedHours.length === 0 || selectedHours.length === 23
      ? 'every hour'
      : selectedHours.map((hour) => hour.name).join(', ') + ' hours';

  const minutesString =
    selectedMinutes.length === 0 || selectedMinutes.length === 59
      ? 'every minute'
      : selectedMinutes.map((minute) => minute.name).join(', ') + ' minutes';

  
  return (
    <div className="weekly">
      <h2 className="weekly__title">
        Every {weekDaysString} at {hoursString} and {minutesString}
      </h2>
      <Weekdays />
      <Time />
    </div>
  );
};
