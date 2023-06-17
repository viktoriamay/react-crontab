import { Monthdays } from '../Monthdays/Monthdays';
import { Months } from '../Months/Months';
import { Time } from '../Time/Time';

export const MonthlySchedule = () => {
  return (
    <div className="content">
      <h2 className="content__title">Monthly schedule</h2>
      <Months />
      <Monthdays />
      <Time />
    </div>
  );
};
