import { useDispatch, useSelector } from 'react-redux';
import { monthdays } from '../../data/data';
import {
  changeMonthdaysValue,
  changeMonthdaysVisibility,
  clearMonthdaysValue,
} from '../../storage/actions/monthdaysActions';
import { useRef } from 'react';
import { changeMonthsVisibility } from '../../storage/actions/monthsActions';
import { changeHoursVisibility } from '../../storage/actions/hoursActions';
import { changeWeekdayVisibility } from '../../storage/actions/weekdaysActions';

export const Monthdays = () => {
  const dispatch = useDispatch();

  const handleMonthdaysChange = (event) => {
    const selectedOptions = [...event.target.selectedOptions];
    const selectedMonthdays = selectedOptions.map((option) => {
      const { name, id, title } = monthdays.find(
        (day) => day.name === option.value
      );
      return { name, id, title };
    });
    dispatch(changeMonthdaysValue(selectedMonthdays));
  };
  const activeMonthdays = useSelector(
    (state) => state.monthdaysOptions.isVisibleMonthdays
  );

  const handleActiveMonthdays = (e) => {
    e.stopPropagation();

    dispatch(changeMonthdaysVisibility(!activeMonthdays));
    dispatch(changeMonthsVisibility(false));

    dispatch(changeHoursVisibility(false));
    dispatch(changeWeekdayVisibility(false));
  };

  const monthdaysRef = useRef();

  const handleClearMonthdays = () => {
    dispatch(clearMonthdaysValue());
    monthdaysRef.current.selectedIndex = -1;
  };
  return (
    <div className="content__selector">
      <div className="content__selector_buttons">
        <button
          className="content__selector_input"
          onClick={handleActiveMonthdays}
        >
          Days
        </button>
        <button
          className="content__selector_button"
          onClick={handleClearMonthdays}
        >
          Clear
        </button>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          activeMonthdays ? 'content__selects active' : 'content__selects'
        }
      >
        <select
          className="content__select"
          name="weekdays"
          id="weekdays"
          multiple
          size={7}
          ref={monthdaysRef}
          onChange={handleMonthdaysChange}
        >
          {monthdays.map((month) => (
            <option
              className="content__option"
              key={month.name}
              id={month.id}
              value={month.name}
            >
              {month.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
