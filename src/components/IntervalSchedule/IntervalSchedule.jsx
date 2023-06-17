import { useDispatch, useSelector } from 'react-redux';
import { MinutesInterval } from '../Intervals/MinutesInterval';
import './IntervalSchedule.scss'
import { changeMinutesIntervalValue, clearIntervalValue } from '../../storage/actions/intervalActions';

export const IntervalSchedule = () => {
  const minutesIntervalValue = useSelector((state) =>
    Number(state.interval.minutesIntervalValue)
  );

  const intervalTitle = minutesIntervalValue === 0 ? 'X' : minutesIntervalValue;

  const dispatch = useDispatch();
  
  const handleIntervalChange = (e) => {
    dispatch(changeMinutesIntervalValue(e.target.value));
  };

  const handleClearInterval = () => {
    dispatch(clearIntervalValue());
  };

  return (
    <div className="content">
      <h2 className="content__title">Each {intervalTitle} minutes</h2>
    <div className='content__selector_buttons'>

      {/* <div style={{width: 150}}> */}

      <MinutesInterval />
      {/* </div> */}
      <button className='content__selector_button' onClick={handleClearInterval}>Clear</button>
    </div>

    </div>
  );
};
