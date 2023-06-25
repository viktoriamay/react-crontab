import { useSelector } from 'react-redux';
import { Monthdays } from '../Monthdays/Monthdays';
import { Months } from '../Months/Months';
import { Time } from '../Time/Time';

export const MonthlySchedule = () => {
  const selectedDays = useSelector(
    (state) => state.monthdaysOptions.selectedMonthdays
  );
  const selectedMonths = useSelector(
    (state) => state.monthsOptions.selectedMonths
  );
  return (
    <div className="content">
      <h2 className="content__title">Monthly schedule {selectedMonths.map(m => m.title)}</h2>
      <Months />
      <Monthdays />
      <Time />
    </div>
  );
};
