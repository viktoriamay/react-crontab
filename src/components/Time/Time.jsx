import { useDispatch } from 'react-redux';
import { hours, minutes } from '../../data/data';
import {
  changeHoursValue,
  clearHoursValue,
} from '../../storage/actions/hoursActions';
import { useRef } from 'react';
import { changeMinutesValue, clearMinutesValue } from '../../storage/actions/minutesActions';

export const Time = () => {
  const dispatch = useDispatch();

  const handleHoursChange = (event) => {
    const selectedOptions = [...event.target.selectedOptions];
    const selectedHours = selectedOptions.map((option) => {
      const { name, id, title } = hours.find(
        (day) => day.name === option.value
      );
      return { name, id, title };
    });
    dispatch(changeHoursValue(selectedHours));
  };

  const hoursRef = useRef();
  const handleMinutesChange = (event) => {
    const selectedOptions = [...event.target.selectedOptions];
    const selectedMinutes = selectedOptions.map((option) => {
      const { name, id, title } = minutes.find(
        (day) => day.name === option.value
      );
      return { name, id, title };
    });
    dispatch(changeMinutesValue(selectedMinutes));
  };

  const minutesRef = useRef();

  const handleClearHours = () => {
    dispatch(clearHoursValue());
    dispatch(clearMinutesValue());
    hoursRef.current.selectedIndex = -1;
    minutesRef.current.selectedIndex = -1;
  };
  return (
    <>
      <select
        name="hours"
        id="hours"
        multiple
        size={7}
        ref={hoursRef}
        onChange={handleHoursChange}
      >
        {hours.map((hour) => (
          <option key={`hour-${hour.name}`} id={hour.id} value={hour.name}>
            {hour.name}
          </option>
        ))}
      </select>
      <select
        name="minutes"
        id="minutes"
        multiple
        size={7}
        ref={minutesRef}
        onChange={handleMinutesChange}
      >
        {minutes.map((minute) => (
          <option
            key={`minute-${minute.name}`}
            id={minute.id}
            value={minute.name}
          >
            {minute.name}
          </option>
        ))}
      </select>
      <button onClick={handleClearHours}>Clear time</button>
    </>
  );
};
