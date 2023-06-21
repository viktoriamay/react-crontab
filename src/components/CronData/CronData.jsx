import { useEffect, useState } from 'react';
import { useCronString } from '../../hooks/useCronString';
import { useCopyToClipboard } from 'react-use';
import './CronData.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeMinutesIntervalValue } from '../../storage/actions/intervalActions';
import { changeMinutesValue } from '../../storage/actions/minutesActions';
import { minutes } from '../../data/data';

export const CronData = () => {
  const { cronString } = useCronString();

  const [state, copyToClipboard] = useCopyToClipboard();

  const [inputData, setInputData] = useState('');
  const [savedData, setSavedData] = useState([]);

  const handleScheduleSave = () => {
    setInputData(cronString);
  };
  const dispatch = useDispatch();
  const selectedMinutes = useSelector(
    (state) => state.minutesOptions.selectedMinutes
  );

  // console.log({selectedMinutes});

  const inputStringMinutes = inputData.split(' ')[0];
  const inputStringHours = inputData.split(' ')[1];
  const inputStringDays = inputData.split(' ')[2];
  const inputStringMonths = inputData.split(' ')[3];
  const inputStringWeekdays = inputData.split(' ')[4];

  // console.log({inputStringMinutes});

  // const str = "1-4,6,8";
  const selectedMinutess = [];
  const aaa = minutes.map((m) => m.id);

  const d = (inputStringMinutes) => {
    const parts = inputStringMinutes.split(',');
    for (let i = 0; i < parts.length; i++) {
      const range = parts[i].split('-');
      if (range.length === 2) {
        const start = parseInt(range[0]);
        const end = parseInt(range[1]);
        for (let j = start; j <= end; j++) {
          const minute = minutes.find((m) => m.id === j);
          if (!aaa.includes(j)) {
            alert('Введите число от 0 до 59');
            return;
          }
          if (minute) {
            selectedMinutess.push(minute);
          }
        }
      } else {
        const num = parseInt(parts[i]);
        if (num < 0 || num > 59) {
          alert('Введите число от 0 до 59');
          return;
        }
        const minute = minutes.find((m) => m.id === num);
        if (minute) {
          selectedMinutess.push(minute);
        }
      }
    }
  };

  d(inputStringMinutes);
  // console.log({selectedMinutess});

  // const inp = inputStringMinutes.split('')
  // const y = inp[inp.length - 1];
  const inp = inputStringMinutes.split()[inputStringMinutes.length - 1];

  const iii = inputStringMinutes.charAt(0);

  console.log({ iii }, { inp });

  // console.log(iii === '*');

  const handleScheduleLoad = () => {
    // если первый элемент массива (разделенной строки), в данном случае число введенное в инпут (минуты) содержит */, то
    if (inputStringMinutes.includes('/')) {
      // получаем первое значение и последнее
      const first = inputStringMinutes.split('/')[0];
      const last = +inputStringMinutes.split('/')[1];
      // и если это число больше нуля (тк нельзя ввести отрицательный интервал) и первое значение содержит * то мы диспатчим значение минутсИнтервал
      if (last > 0 && first === '*') {
        dispatch(changeMinutesIntervalValue(last));
        setInputData('');
        //если нет, то выводим алерт и не позволяем отправить данные
      } else {
        alert('invalid format');
      }
      // в ином случае работаем с форматом минут
    }
    // else if (!inputStringMinutes.indexOf('*/') + 1) {
    // alert('invalid format');
    //
    // }
    else {
      dispatch(changeMinutesValue(selectedMinutess));
      setInputData('');
    }
    // setInputData(cronString);
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

  return (
    <div className="crondata">
      <div className="crondata__buttons_wrapper">
        <input
          className="content__selector_buttons content__selector_input crondata__input"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <div className="crondata__buttons">
          <button
            className="content__selector_button 
            
            "
            onClick={handleScheduleLoad}
          >
            Load
          </button>
          <button
            className="content__selector_button "
            onClick={handleScheduleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
