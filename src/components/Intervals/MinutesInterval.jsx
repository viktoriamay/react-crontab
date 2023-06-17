import { useDispatch, useSelector } from 'react-redux';
import { changeMinutesIntervalValue } from '../../storage/actions/intervalActions';
import './Interval.scss';

export const MinutesInterval = () => {
  const dispatch = useDispatch();
  const minutesIntervalValue = useSelector(
    (state) => state.interval.minutesIntervalValue
  );

  const handleIntervalChange = (e) => {
    dispatch(changeMinutesIntervalValue(e.target.value));
  };

  return (
    <input
      type="number"
      name="minutesInterval"
      id="minutesInterval"
      className="interval__input"
      min="0"
      max="150"
      value={minutesIntervalValue}
      onChange={handleIntervalChange}
    />
  );
};
