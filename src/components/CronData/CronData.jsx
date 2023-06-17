import { useEffect, useState } from 'react';
import { useCronString } from '../../hooks/useCronString';
import { useCopyToClipboard } from 'react-use';
import './CronData.scss';

export const CronData = () => {
  const { cronString } = useCronString();

  const [state, copyToClipboard] = useCopyToClipboard();

  const [inputData, setInputData] = useState('');
  const [savedData, setSavedData] = useState([]);

  const handleInputChange = () => {
    setInputData(cronString);
  };

  useEffect(() => {
    if (cronString === '* * * * *') {
      setInputData('');
    } else {
      setInputData(cronString);
    }
  }, []);

  useEffect(() => {
    const savedDataFromLocalStorage = localStorage.getItem('savedData');
    if (savedDataFromLocalStorage) {
      setSavedData(JSON.parse(savedDataFromLocalStorage));
    }
  }, []);

  const handleAddClick = () => {
    if (inputData.trim() !== '') {
      const updatedData = [...savedData, inputData];
      setSavedData(updatedData);
      setInputData('');
      localStorage.setItem('savedData', JSON.stringify(updatedData));
    }
  };

  const removeItemFromLocalStorage = (index) => {
    const savedDataFromLocalStorage = localStorage.getItem('savedData');
    if (savedDataFromLocalStorage) {
      const savedData = JSON.parse(savedDataFromLocalStorage);
      savedData.splice(index, 1);
      localStorage.setItem('savedData', JSON.stringify(savedData));
      setSavedData(savedData);
    }
  };

  return (
    <div className="crondata">
      <div className="crondata__buttons_wrapper">
        <input
          className="content__selector_buttons content__selector_input crondata__input"
          type="text"
          value={inputData}
          readOnly
        />
        <div className="crondata__buttons">
          <button
            className="content__selector_button 
            
            "
            onClick={handleInputChange}
          >
            Load
          </button>
          <button
            className="content__selector_button "
            onClick={handleAddClick}
          >
            Save
          </button>
        </div>
      </div>
      <div className="crondata__list">
        {savedData.map((data, index) => (
          <div className="crondata__item" key={Math.random(index)}>
            <p
              className="crondata__name"
              onClick={(e) => copyToClipboard(e.target.innerHTML)}
            >
              {data}
            </p>
            <button
              className="crondata__delete_button"
              onClick={() => removeItemFromLocalStorage(index)}
            ></button>
          </div>
        ))}
        {state.error ? (
          <p className="crondata__copy">
            Unable to copy value: {state.error.message}
          </p>
        ) : (
          state.value && (
            <p className="crondata__copy">Copied {state.value}</p>
          )
        )}
      </div>
    </div>
  );
};
