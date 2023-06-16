import { useDispatch, useSelector } from 'react-redux';
import {
  changeHoursIntervalValue,
  clearIntervalValue,
} from '../../storage/actions/intervalActions';

export const HoursInterval = () => {
  const dispatch = useDispatch();
  const hoursIntervalValue = useSelector((state) => state.interval.hoursIntervalValue);
  
  const handleIntervalChange = (e) => {
    dispatch(changeHoursIntervalValue(e.target.value));
  };

  const handleClearInterval = () => {
    dispatch(clearIntervalValue());
  };

  return (
    <>
      <input
        type="number"
        name="interval"
        id="interval"
        className="interval__input"
        min="0"
        max="150"
        value={hoursIntervalValue}
        onChange={handleIntervalChange}
      />
    </>
  );
};
