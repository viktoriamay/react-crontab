import { useCronString } from '../../hooks/useCronString';
import { CronData } from '../CronData/CronData';
import './CronString.scss';

export const CronString = () => {
  const {
    minutesCronValue,
    hoursCronValue,
    monthdaysCronValue,
    monthsCronValue,
    weekdaysCronValue,
    cronString,
  } = useCronString();

  return (
    <div className="cronstring">
      <div className="cronstring__item">
        <span className="cronstring__value">{minutesCronValue}</span>
        <span className="cronstring__name">Minutes</span>
      </div>
      <div className="cronstring__item">
        <span className="cronstring__value">{hoursCronValue}</span>
        <span className="cronstring__name">Hours</span>
      </div>
      <div className="cronstring__item">
        <span className="cronstring__value">{monthdaysCronValue}</span>
        <span className="cronstring__name">Days</span>
      </div>
      <div className="cronstring__item">
        <span className="cronstring__value">{monthsCronValue}</span>
        <span className="cronstring__name">Months</span>
      </div>
      <div className="cronstring__item">
        <span className="cronstring__value">{weekdaysCronValue}</span>
        <span className="cronstring__name">Weekdays</span>
      </div>

      {/* <CronData /> */}
    </div>
  );
};
