import { useDispatch, useSelector } from 'react-redux';
import { changeMonthsIntervalValue } from '../../storage/actions/intervalActions';

export const MonthsInterval = () => {
  const dispatch = useDispatch();
  const monthsIntervalValue = useSelector(
    (state) => state.interval.monthsIntervalValue
  );

  const handleIntervalChange = (e) => {
    dispatch(changeMonthsIntervalValue(e.target.value));
  };

  return (
    <input
      type="number"
      name="monthsInterval"
      id="monthsInterval"
      className="interval__input"
      min="0"
      max="150"
      value={monthsIntervalValue}
      onChange={handleIntervalChange}
    />
  );
};
