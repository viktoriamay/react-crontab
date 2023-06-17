import { useDispatch, useSelector } from 'react-redux';
import { changeHoursIntervalValue } from '../../storage/actions/intervalActions';

export const HoursInterval = () => {
  const dispatch = useDispatch();
  const hoursIntervalValue = useSelector(
    (state) => state.interval.hoursIntervalValue
  );

  const handleIntervalChange = (e) => {
    dispatch(changeHoursIntervalValue(e.target.value));
  };

  return (
    <input
      type="number"
      name="hoursInterval"
      id="hoursInterval"
      className="interval__input"
      min="0"
      max="150"
      value={hoursIntervalValue}
      onChange={handleIntervalChange}
    />
  );
};
