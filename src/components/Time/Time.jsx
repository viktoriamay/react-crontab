import { useDispatch, useSelector } from 'react-redux';
import { hours, minutes } from '../../data/data';
import {
  changeHoursValue,
  changeHoursVisibility,
  clearHoursValue,
} from '../../storage/actions/hoursActions';
import { useRef } from 'react';
import {
  changeMinutesValue,
  clearMinutesValue,
} from '../../storage/actions/minutesActions';
import { changeWeekdayVisibility } from '../../storage/actions/weekdaysActions';
import { changeMonthdaysVisibility } from '../../storage/actions/monthdaysActions';
import { changeMonthsVisibility } from '../../storage/actions/monthsActions';

export const Time = () => {
  const dispatch = useDispatch();

  const hoursRef = useRef();

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

  const activeTime = useSelector((state) => state.hoursOptions.isVisibleHours);

  const handleActiveTime = (e) => {
    dispatch(changeHoursVisibility(!activeTime));
    e.stopPropagation();
    dispatch(changeWeekdayVisibility(false));
    dispatch(changeMonthdaysVisibility(false));
    dispatch(changeMonthsVisibility(false));
  };

  const minutesRef = useRef();

  const handleClearHours = () => {
    dispatch(clearHoursValue());
    dispatch(clearMinutesValue());
    hoursRef.current.selectedIndex = -1;
    minutesRef.current.selectedIndex = -1;
  };

  return (
    <div className="content__selector">
      <div className="content__selector_buttons">
        <button className="content__selector_input" onClick={handleActiveTime}>
          HH:MM
        </button>
        <button className="content__selector_button" onClick={handleClearHours}>
          Clear
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={activeTime ? 'content__selects active' : 'content__selects'}
      >
        <select
          name="hours"
          id="hours"
          multiple
          size={7}
          ref={hoursRef}
          onChange={handleHoursChange}
          className="content__select content__select_time"
        >
          {hours.map((hour) => (
            <option
              className="content__option"
              key={`hour-${hour.name}`}
              id={hour.id}
              value={hour.name}
            >
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
          className="content__select content__select_time"
        >
          {minutes.map((minute) => (
            <option
              className="content__option"
              key={`minute-${minute.name}`}
              id={minute.id}
              value={minute.name}
            >
              {minute.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
