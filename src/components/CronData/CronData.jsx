import { useEffect, useState } from 'react';
import { useCronString } from '../../hooks/useCronString';
import { useCopyToClipboard } from 'react-use';

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
    <div className="content__crondata_wrapper">
      <div className="content__selector_buttons_crondata_wrapper">
        <input
          className="content__selector_buttons content__selector_input content__selector_input_crondata"
          type="text"
          value={inputData}
          readOnly
        />
        <div className="content__selector_buttons_crondata">
          <button
            className="content__selector_button content__selector_button_crondata"
            onClick={handleInputChange}
          >
            Load
          </button>
          <button
            className="content__selector_button content__selector_button_crondata"
            onClick={handleAddClick}
          >
            Save
          </button>
        </div>
      </div>
      <div className="content__crondata_list">
        {savedData.map((data, index) => (
          <div className="content__crondata_item" key={Math.random(index)}>
            <p
              className="content__crondata_name"
              onClick={(e) => copyToClipboard(e.target.innerHTML)}
            >
              {data}
            </p>
            <button
              className=" content__delete_button"
              onClick={() => removeItemFromLocalStorage(index)}
            ></button>
          </div>
        ))}
            {state.error ? (
              <p className='content__crondata_copy'>Unable to copy value: {state.error.message}</p>
            ) : (
              state.value && <p className='content__crondata_copy'>Copied {state.value}</p>
            )}
      </div>
    </div>
  );
};
