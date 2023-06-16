import { useDispatch, useSelector } from 'react-redux';
import {
  changeMonthdaysIntervalValue,
  clearIntervalValue,
} from '../../storage/actions/intervalActions';

export const MonthdaysInterval = () => {
  const dispatch = useDispatch();
  const monthdaysIntervalValue = useSelector((state) => state.interval.monthdaysIntervalValue);
  
  const handleIntervalChange = (e) => {
    dispatch(changeMonthdaysIntervalValue(e.target.value));
  };

  const handleClearInterval = () => {
    dispatch(clearIntervalValue());
  };

  return (
    <>
      <input
        type="number"
        name="interval"
        id="interval"
        className="interval__input"
        min="0"
        max="150"
        value={monthdaysIntervalValue}
        onChange={handleIntervalChange}
      />
    </>
  );
};
