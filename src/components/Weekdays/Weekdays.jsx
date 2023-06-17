import { useDispatch, useSelector } from 'react-redux';
import { weekDays } from '../../data/data';
import {
  changeWeekdayValue,
  changeWeekdayVisibility,
  clearWeekdayValue,
} from '../../storage/actions/weekdaysActions';
import { useRef, useState } from 'react';
import { changeMonthdaysVisibility } from '../../storage/actions/monthdaysActions';
import { changeMonthsVisibility } from '../../storage/actions/monthsActions';
import { changeHoursVisibility } from '../../storage/actions/hoursActions';

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

  const activeWeekdays = useSelector(
    (state) => state.weekdayOptions.isVisibleWeekdays
  );

  const handleActiveWeekdays = (e) => {
    e.stopPropagation();

    dispatch(changeWeekdayVisibility(!activeWeekdays));
    dispatch(changeMonthdaysVisibility(false));
    dispatch(changeMonthsVisibility(false));

    dispatch(changeHoursVisibility(false));
  };

  const weekdaysRef = useRef();

  const handleClearWeekdays = () => {
    dispatch(clearWeekdayValue());
    weekdaysRef.current.selectedIndex = -1;
  };
  return (
    <div className="content__selector">
      <div className="content__selector_buttons">
        <button
          className="content__selector_input"
          onClick={handleActiveWeekdays}
        >
          Weekdays
        </button>
        <button
          className="content__selector_button"
          onClick={handleClearWeekdays}
        >
          Clear
        </button>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          activeWeekdays ? 'content__selects active' : 'content__selects'
        }
      >
        <select
          className="content__select"
          name="weekdays"
          id="weekdays"
          multiple
          size={7}
          ref={weekdaysRef}
          onChange={handleWeekdaysChange}
        >
          {weekDays.map((weekday) => (
            <option
              className="content__option"
              key={weekday.name}
              id={weekday.id}
              value={weekday.name}
            >
              {weekday.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
