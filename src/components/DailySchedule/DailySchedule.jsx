import { useSelector } from 'react-redux';
import { Time } from '../Time/Time';

export const DailySchedule = () => {
  const selectedHours = useSelector(
    (state) => state.hoursOptions.selectedHours
  );

  const selectedMinutes = useSelector(
    (state) => state.minutesOptions.selectedMinutes
  );

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
        Every day at {hoursString} and {minutesString}
      </h2>
      <Time />
    </div>
  );
};
