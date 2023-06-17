import { useDispatch } from 'react-redux';
import './App.scss';
import { CronData } from './components/CronData/CronData';
import { Schedule } from './components/Schedule/Schedule';
import { useEffect } from 'react';
import { changeMonthsVisibility } from './storage/actions/monthsActions';
import { changeHoursVisibility } from './storage/actions/hoursActions';
import { changeWeekdayVisibility } from './storage/actions/weekdaysActions';
import { changeMonthdaysVisibility } from './storage/actions/monthdaysActions';

function App() {
  const dispatch = useDispatch();
  
  const handleOutsideClick = () => {
    dispatch(changeMonthsVisibility(false));
    dispatch(changeHoursVisibility(false));
    dispatch(changeWeekdayVisibility(false));
    dispatch(changeMonthdaysVisibility(false));
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="App">
      <Schedule />
      <CronData />
    </div>
  );
}

export default App;
