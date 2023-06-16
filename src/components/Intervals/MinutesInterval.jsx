import { useDispatch, useSelector } from 'react-redux';
import {
  changeMinutesIntervalValue,
  clearIntervalValue,
} from '../../storage/actions/intervalActions';

export const MinutesInterval = () => {
  const dispatch = useDispatch();
  const minutesIntervalValue = useSelector((state) => state.interval.minutesIntervalValue);
  
  const handleIntervalChange = (e) => {
    dispatch(changeMinutesIntervalValue(e.target.value));
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
        value={minutesIntervalValue}
        onChange={handleIntervalChange}
      />
      <button onClick={handleClearInterval}>Clear interval</button>
    </>
  );
};
