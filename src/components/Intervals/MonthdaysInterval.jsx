import { useDispatch, useSelector } from 'react-redux';
import { changeMonthdaysIntervalValue } from '../../storage/actions/intervalActions';

export const MonthdaysInterval = () => {
  const dispatch = useDispatch();
  const monthdaysIntervalValue = useSelector(
    (state) => state.interval.monthdaysIntervalValue
  );

  const handleIntervalChange = (e) => {
    dispatch(changeMonthdaysIntervalValue(e.target.value));
  };

  return (
    <input
      type="number"
      name="monthdaysInterval"
      id="monthdaysInterval"
      className="interval__input"
      min="0"
      max="150"
      value={monthdaysIntervalValue}
      onChange={handleIntervalChange}
    />
  );
};
