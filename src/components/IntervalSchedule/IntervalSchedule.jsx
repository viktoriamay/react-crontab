import { useSelector } from 'react-redux';
import { MinutesInterval } from '../Intervals/MinutesInterval';

export const IntervalSchedule = () => {
  const minutesIntervalValue = useSelector((state) =>
    Number(state.interval.minutesIntervalValue)
  );

  const intervalTitle = minutesIntervalValue === 0 ? 'X' : minutesIntervalValue;

  return (
    <div className="interval">
      <h2 className="interval__title">Each {intervalTitle} minutes</h2>
      <MinutesInterval />
    </div>
  );
};
