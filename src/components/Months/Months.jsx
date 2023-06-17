import { useDispatch, useSelector } from 'react-redux';
import { months } from '../../data/data';
import {
  changeMonthsValue,
  changeMonthsVisibility,
  clearMonthsValue,
} from '../../storage/actions/monthsActions';
import { useEffect, useRef } from 'react';
import { changeHoursVisibility } from '../../storage/actions/hoursActions';
import { changeWeekdayVisibility } from '../../storage/actions/weekdaysActions';
import { changeMonthdaysVisibility } from '../../storage/actions/monthdaysActions';

export const Months = () => {
  const dispatch = useDispatch();

  const handleMonthsChange = (event) => {
    const selectedOptions = [...event.target.selectedOptions];
    const selectedMonths = selectedOptions.map((option) => {
      const { name, id, title } = months.find(
        (day) => day.name === option.value
      );
      return { name, id, title };
    });
    dispatch(changeMonthsValue(selectedMonths));
  };

  const activeMonth = useSelector(
    (state) => state.monthsOptions.isVisibleMonths
  );
  const ref = useRef();

  const handleActiveMonths = (e) => {
    e.stopPropagation();
    dispatch(changeMonthsVisibility(!activeMonth));

    dispatch(changeHoursVisibility(false));
    dispatch(changeWeekdayVisibility(false));
    dispatch(changeMonthdaysVisibility(false));

  
    
  };

// const handleOutsideClick = (e) => {
//     dispatch(changeMonthsVisibility(false));

//     dispatch(changeHoursVisibility(false));
//     dispatch(changeWeekdayVisibility(false));
//     dispatch(changeMonthdaysVisibility(false));
// };

// useEffect(() => {
//   document.addEventListener('click', handleOutsideClick);
//   return () => {
//     document.removeEventListener('click', handleOutsideClick);
//   };
// }, []);


  const monthsRef = useRef();

  const handleClearMonths = () => {
    dispatch(clearMonthsValue());
    monthsRef.current.selectedIndex = -1;
  };
  return (
    <div className="content__selector" 
        // onClick={lll}
    >
      <div className="content__selector_buttons">
        <button
              ref={ref}
      id='refff'

          className="content__selector_input"
          onClick={handleActiveMonths}
        >
          Months
        </button>
        <button
          className="content__selector_button"
          onClick={handleClearMonths}
        >
          Clear
        </button>
      </div>
      <div
      onClick={e=>e.stopPropagation()}
        className={activeMonth ? 'content__selects active' : 'content__selects'}
      >
        <select
          className="content__select"
          name="weekdays"
          id="weekdays"
          multiple
          size={7}
          ref={monthsRef}
          onChange={handleMonthsChange}
        >
          {months.map((month) => (
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
