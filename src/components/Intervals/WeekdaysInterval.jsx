import { useDispatch, useSelector } from 'react-redux';
import { changeWeekdaysIntervalValue } from '../../storage/actions/intervalActions';

export const WeekdaysInterval = () => {
  const dispatch = useDispatch();
  const weekdaysIntervalValue = useSelector(
    (state) => state.interval.weekdaysIntervalValue
  );

  const handleIntervalChange = (e) => {
    dispatch(changeWeekdaysIntervalValue(e.target.value));
  };

  return (
    <>
      <input
        type="number"
        name="weekdaysInterval"
        id="weekdaysInterval"
        className="interval__input"
        min="0"
        max="150"
        value={weekdaysIntervalValue}
        onChange={handleIntervalChange}
      />
    </>
  );
};
