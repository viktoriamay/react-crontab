import { useDispatch } from "react-redux";
import { months } from "../../data/data";
import { changeMonthsValue, clearMonthsValue } from "../../storage/actions/monthsActions";
import { useRef } from "react";

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

  const monthsRef = useRef();

  const handleClearMonths = () => {
    dispatch(clearMonthsValue());
    monthsRef.current.selectedIndex = -1;
  };
  return (
    <>
      <select
        name="weekdays"
        id="weekdays"
        multiple
        size={7}
        ref={monthsRef}
        onChange={handleMonthsChange}
      >
        {months.map((month) => (
          <option key={month.name} id={month.id} value={month.name}>
            {month.name}
          </option>
        ))}
      </select>
      <button onClick={handleClearMonths}>Clear months</button>
    </>
  );
}