import { useDispatch } from "react-redux";
import { monthdays } from "../../data/data";
import { changeMonthdaysValue, clearMonthdaysValue } from "../../storage/actions/monthdaysActions";
import { useRef } from "react";

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

  const monthdaysRef = useRef();

  const handleClearMonthdays = () => {
    dispatch(clearMonthdaysValue());
    monthdaysRef.current.selectedIndex = -1;
  };
  return (
    <>
      <select
        name="weekdays"
        id="weekdays"
        multiple
        size={7}
        ref={monthdaysRef}
        onChange={handleMonthdaysChange}
      >
        {monthdays.map((month) => (
          <option key={month.name} id={month.id} value={month.name}>
            {month.name}
          </option>
        ))}
      </select>
      <button onClick={handleClearMonthdays}>Clear monthdays</button>
    </>
  );
}