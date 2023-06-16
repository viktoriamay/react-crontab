import { useDispatch, useSelector } from 'react-redux';
import { weekDays } from '../../data/data';
import {
  changeWeekdayValue,
  clearWeekdayValue,
} from '../../storage/actions/weekdaysActions';
import { useRef } from 'react';

export const Weekdays = () => {
  const dispatch = useDispatch();

  const handleWeekdaysChange = (event) => {
    const selectedOptions = [...event.target.selectedOptions];
    const selectedDays = selectedOptions.map((option) => {
      const { name, id, title } = weekDays.find(
        (day) => day.name === option.value
      );
      return { name, id, title };
    });
    dispatch(changeWeekdayValue(selectedDays));
  };

  const weekdaysRef = useRef();

  const handleClearWeekdays = () => {
    dispatch(clearWeekdayValue());
    weekdaysRef.current.selectedIndex = -1;
  };
  return (
    <>
      <select
        name="weekdays"
        id="weekdays"
        multiple
        size={7}
        ref={weekdaysRef}
        onChange={handleWeekdaysChange}
      >
        {weekDays.map((weekday) => (
          <option key={weekday.name} id={weekday.id} value={weekday.name}>
            {weekday.name}
          </option>
        ))}
      </select>
      <button onClick={handleClearWeekdays}>Clear weekdays</button>
    </>
  );
};
