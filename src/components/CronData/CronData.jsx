import { useEffect, useState } from 'react';
import { useCronString } from '../../hooks/useCronString';
import { useCopyToClipboard } from 'react-use';
import './CronData.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeHoursIntervalValue,
  changeMinutesIntervalValue,
  changeMonthdaysIntervalValue,
  changeMonthsIntervalValue,
  changeWeekdaysIntervalValue,
} from '../../storage/actions/intervalActions';
import { changeMinutesValue } from '../../storage/actions/minutesActions';
import { hours, minutes, monthdays, months, weekDays } from '../../data/data';
import { changeHoursValue } from '../../storage/actions/hoursActions';
import { changeMonthdaysValue } from '../../storage/actions/monthdaysActions';
import { changeMonthsValue } from '../../storage/actions/monthsActions';
import { changeWeekdayValue } from '../../storage/actions/weekdaysActions';

export const CronData = () => {
  const dispatch = useDispatch();

  const selectedMinutes = useSelector(
    (state) => state.minutesOptions.selectedMinutes
  );

  const { cronString } = useCronString();

  const [state, copyToClipboard] = useCopyToClipboard();

  const [inputData, setInputData] = useState('');
  const [savedData, setSavedData] = useState([]);
  const [error, setError] = useState(false);

  const inputStringMinutes = inputData.split(' ')[0];
  const inputStringHours = inputData.split(' ')[1];
  const inputStringDays = inputData.split(' ')[2];
  const inputStringMonths = inputData.split(' ')[3];
  const inputStringWeekdays = inputData.split(' ')[4];

  const selectedMinutesInInput = [];
  const selectedHoursInInput = [];
  const selectedDaysInInput = [];
  const selectedMonthsInInput = [];
  const selectedWeekdaysInInput = [];

  const handleScheduleSave = () => {
    setInputData(cronString);
  };

  const intervalScheduleChange = (inputStringValue, dispatchChangeValue) => {
    if (inputStringValue.includes('/')) {
      const first = inputStringValue.split('/')[0];
      const last = +inputStringValue.split('/')[1];

      if (last > 0 && first === '*') {
        dispatch(dispatchChangeValue(last));
        setInputData('');
      } else {
        alert('Invalid interval value');
      }
    }
  };

  const validateSelectedOptions = (
    inputStringValue,
    optionsData,
    dispatchChangeValue,
    selectedMinutesInInput
  ) => {
    if (inputStringValue === '*') {
      return;
    }
    if (inputStringValue === '') {
      return;
    }

    const inputValuePartComma = inputStringValue.split(',');
    let hasError = false;

    for (let i = 0; i < inputValuePartComma.length; i++) {
      const inputValuePartDash = inputValuePartComma[i].split('-');

      if (inputValuePartDash.length === 2) {
        const startPartDash = inputValuePartDash[0];
        const endPartDash = inputValuePartDash[1];

        if (
          !optionsData.some((d) => d.title === startPartDash) ||
          !optionsData.some((d) => d.title === endPartDash)
        ) {
          setError(true);
          hasError = true;
        } else {
          optionsData.forEach((day) => {
            if (day.title === startPartDash || day.title === endPartDash) {
              selectedMinutesInInput.push(day);
            } else if (
              day.id >
                optionsData.find((item) => item.title === startPartDash).id &&
              day.id < optionsData.find((item) => item.title === endPartDash).id
            ) {
              selectedMinutesInInput.push(day);
            }
          });
        }
      } else {
        const num = inputValuePartComma[i];
        const optionData = optionsData.find((m) => m.title === num);
        if (!optionData) {
          setError(true);
          hasError = true;
        } else {
          if (
            optionData ||
            inputStringValue === '*' ||
            inputStringValue === '' ||
            0
          ) {
            selectedMinutesInInput.push(
              optionData ||
                inputStringValue === '*' ||
                inputStringValue === '' ||
                0
            );
          }
        }
      }
    }

    const hasDuplicates = selectedMinutesInInput.some((item, index) => {
      return selectedMinutesInInput
        .filter((_, i) => i !== index)
        .some((other) => {
          return item.title === other.title;
        });
    });

    if (hasDuplicates) {
      alert('Duplicate values are not allowed');
      return;
    }

    if (hasError) {
      alert('Invalid input value');
    } else {
      dispatch(dispatchChangeValue(selectedMinutesInInput));
      setInputData('');
    }

    setError(false);
  };

  const handleScheduleLoad = () => {
    // если первый элемент массива (разделенной строки), в данном случае число введенное в инпут (минуты) содержит */, то работаем с форматом интервалов

    if (
      inputStringMinutes.includes('/') ||
      inputStringHours.includes('/') ||
      inputStringDays.includes('/') ||
      inputStringMonths.includes('/') ||
      inputStringWeekdays.includes('/')
    ) {
      intervalScheduleChange(inputStringMinutes, changeMinutesIntervalValue);
      intervalScheduleChange(inputStringHours, changeHoursIntervalValue);
      intervalScheduleChange(inputStringDays, changeMonthdaysIntervalValue);
      intervalScheduleChange(inputStringMonths, changeMonthsIntervalValue);
      intervalScheduleChange(inputStringWeekdays, changeWeekdaysIntervalValue);
    }
    // в ином случае работаем с форматом минут
    else {
      validateSelectedOptions(
        inputStringMinutes,
        minutes,
        changeMinutesValue,
        selectedMinutesInInput
      );

      validateSelectedOptions(
        inputStringHours,
        hours,
        changeHoursValue,
        selectedHoursInInput
      );

      validateSelectedOptions(
        inputStringDays,
        monthdays,
        changeMonthdaysValue,
        selectedDaysInInput
      );

      validateSelectedOptions(
        inputStringMonths,
        months,
        changeMonthsValue,
        selectedMonthsInInput
      );

      validateSelectedOptions(
        inputStringWeekdays,
        weekDays,
        changeWeekdayValue,
        selectedWeekdaysInInput
      );
    }
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
            className="content__selector_button"
            onClick={
              inputData === '' ? setInputData('* * * * *') : handleScheduleLoad
            }
          >
            Load
          </button>
          <button
            className="content__selector_button"
            onClick={handleScheduleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
