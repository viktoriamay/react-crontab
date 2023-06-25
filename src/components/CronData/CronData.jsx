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

  // console.log({selectedMinutes});

  // console.log({inputData});
  // const str = "1-4,6,8";
  const selectedMinutesInInput = [];
  const selectedHoursInInput = [];
  const selectedDaysInInput = [];
  const selectedMonthsInInput = [];
  const selectedWeekdaysInInput = [];

  const datasIds = (data) => {
    return data.map((m) => m.id);
  };

  // const d = (inputStringMinutes) => {
  //   const minutesPartComma = inputStringMinutes.split(',');
  //   for (let i = 0; i < minutesPartComma.length; i++) {
  //     const minutesPartDash = minutesPartComma[i].split('-');
  //     if (minutesPartDash.length === 2) {
  //       const startPartDash = parseInt(minutesPartDash[0]);
  //       const endPartDash = parseInt(minutesPartDash[1]);
  //       for (let j = startPartDash; j <= endPartDash; j++) {
  //         const minute = minutes.find((m) => m.id === j);
  //         if (!minutesIds.includes(j)) {
  //           alert('Введите число от 0 до 59');
  //           return;
  //         }
  //         if (minute) {
  //           selectedMinutesInInput.push(minute);

  //         }
  //       }
  //     } else {
  //       const num = parseInt(minutesPartComma[i]);
  //       if (num < 0 || num > 59) {
  //         alert('Введите число от 0 до 59');
  //         return;
  //       }
  //       const minute = minutes.find((m) => m.id === num);
  //       if (minute) {
  //         selectedMinutesInInput.push(minute);

  //       }
  //     }
  //   }

  // };

  const uniqueMinutes = [];

  // console.log(minutesIds[0]);

  /* const d = () => {
    if (inputStringMinutes === '*') {
      return;
    }

    const minutesPartComma = inputStringMinutes.split(',');
    for (let i = 0; i < minutesPartComma.length; i++) {
      const minutesPartDash = minutesPartComma[i].split('-');

      if (minutesPartDash.length === 2) {
        const startPartDash = parseInt(minutesPartDash[0]);
        const endPartDash = parseInt(minutesPartDash[1]);

        if (!startPartDash && endPartDash * -1 < minutesIds[0]) {
          alert('no');
        }
        for (let j = startPartDash; j <= endPartDash; j++) {
          const minute = minutes.find((m) => m.id === j);
          if (!minute) {
            alert('Введите число от 0 до 59');
            return;
          }
          if (uniqueMinutes.includes(j)) {
            alert('Значения минут должны быть уникальными');
            return;
          }
          uniqueMinutes.push(j);
          if (minute) {
            selectedMinutesInInput.push(minute);
          }
        }
      } else {
        const num = parseInt(minutesPartComma[i]);

        const minute = minutes.find((m) => m.id === num);
        if (minute || inputStringMinutes === '*' || inputStringMinutes === '') {
          selectedMinutesInInput.push(
            minute || inputStringMinutes === '*' || inputStringMinutes === ''
          );
        } else if (!minute) {
          alert('Введите число от 0 до 59');
          return;
        }
        if (uniqueMinutes.includes(num)) {
          alert('Значения минут должны быть уникальными');
          return;
        }
        uniqueMinutes.push(num);
      }
    }
  }; */

  const intervalScheduleChange = (inputStringValue, dispatchChangeValue) => {
    if (inputStringValue.includes('/')) {
    const first = inputStringValue.split('/')[0];
    const last = +inputStringValue.split('/')[1];
    // и если это число больше нуля (тк нельзя ввести отрицательный интервал) и первое значение содержит * то мы диспатчим значение минутсИнтервал
    if (last > 0 && first === '*') {
      dispatch(dispatchChangeValue(last));
      setInputData('');
      //если нет, то выводим алерт и не позволяем отправить данные
    } else {
      alert('invalid formatкккккк');
    }

  };
  };

  // const validateSelectedOptions = (
  //   inputStringValue,
  //   optionsDataIds,
  //   optionsData
  // ) => {
  //   if (inputStringValue === '*') {
  //     return;
  //   }

  //   const uniqueInputData = [];

  //   const inputValuePartComma = inputStringValue.split(',');
  //   for (let i = 0; i < inputValuePartComma.length; i++) {
  //     const inputValuePartDash = inputValuePartComma[i].split('-');

  //     if (inputValuePartDash.length === 2) {
  //       const startPartDash = parseInt(inputValuePartDash[0]);
  //       const endPartDash = parseInt(inputValuePartDash[1]);

  //       if (!startPartDash && endPartDash * -1 < optionsDataIds[0]) {
  //         alert('no');
  //         return
  //       }
  //       for (let j = startPartDash; j <= endPartDash; j++) {
  //         const optionData = optionsData.find((m) => m.id === j);
  //         // if (!optionData) {
  //         //   alert('Введите число от 0 до 59');
  //         //   return;
  //         // }
  //         if (uniqueInputData.includes(j)) {
  //           alert('Значения минут должны быть уникальными');
  //           return;
  //         }
  //         // uniqueInputData.push(j);
  //         if (optionData) {
  //           selectedMinutesInInput.push(optionData);
  //     dispatch(changeMinutesValue(selectedMinutesInInput));
  //     setInputData('');

  //         } else {
  //           alert('Введите число от 0 до 59');
  //           return;
  //         }
  //       }
  //     } else {
  //       const num = parseInt(inputValuePartComma[i]);

  //       const optionData = optionsData.find((m) => m.id === num);
  //       if (optionData || inputStringValue === '*' || inputStringValue === '') {
  //         selectedMinutesInInput.push(
  //           optionData || inputStringValue === '*' || inputStringValue === ''
  //         );
  //     dispatch(changeMinutesValue(selectedMinutesInInput));
  //     setInputData('');

  //     // uniqueInputData.push(num);
  //       } else if (!optionData) {
  //         alert('Введите число от 0 до 59');
  //         return;
  //       }
  //       if (uniqueInputData.includes(num)) {
  //         alert('Значения минут должны быть уникальными');
  //         return;
  //       }
  //     }
  //   }
  // };

  // const validateSelectedOptions = (
  //   inputStringValue,
  //   optionsDataIds,
  //   optionsData
  // ) => {
  //   if (inputStringValue === '*') {
  //     return;
  //   }

  //   const uniqueInputData = [];

  //   const inputValuePartComma = inputStringValue.split(',');
  //   for (let i = 0; i < inputValuePartComma.length; i++) {
  //     const inputValuePartDash = inputValuePartComma[i].split('-');

  //     if (inputValuePartDash.length === 2) {
  //       const startPartDash = parseInt(inputValuePartDash[0]);
  //       const endPartDash = parseInt(inputValuePartDash[1]);

  //       if (!startPartDash && endPartDash * -1 < optionsDataIds[0]) {
  //         alert('no');
  //         return;
  //       }
  //       for (let j = startPartDash; j <= endPartDash; j++) {
  //         const optionData = optionsData.find((m) => m.id === j);
  //         if (!optionData) {
  //           alert('Введите число от 0 до 59');
  //           return;
  //         }
  //         if (uniqueInputData.includes(j)) {
  //           alert('Значения минут должны быть уникальными');
  //           return;
  //         }
  //         uniqueInputData.push(j);
  //         if (optionData) {
  //           selectedMinutesInInput.push(optionData);
  //           dispatch(changeMinutesValue(selectedMinutesInInput));
  //   setInputData('');

  //         }
  //       }
  //     } else {
  //       const num = parseInt(inputValuePartComma[i]);

  //       const optionData = optionsData.find((m) => m.id === num);
  //       if (optionData || inputStringValue === '*' || inputStringValue === '') {
  //         if (uniqueInputData.includes(num)) {
  //           alert('Значения минут должны быть уникальными');
  //           return;
  //         }
  //         uniqueInputData.push(num);
  //         selectedMinutesInInput.push(
  //           optionData || inputStringValue === '*' || inputStringValue === ''
  //         );
  //         dispatch(changeMinutesValue(selectedMinutesInInput));
  //   setInputData('');

  //       } else {
  //         alert('Введите число от 0 до 59');
  //         return;
  //       }
  //     }
  //   }
  //   // setInputData(inputStringValue);
  // };

  // ----------- РАБОЧЕЕ ----------------
  // const validateSelectedOptions = (
  //   inputStringValue,
  //   optionsDataIds,
  //   optionsData,dispatchChangeValue,selectedMinutesInInput
  // ) => {
  //   if (inputStringValue === '*') {
  //     return;
  //   }

  //   const uniqueInputData = [];

  //   const inputValuePartComma = inputStringValue.split(',');
  //   for (let i = 0; i < inputValuePartComma.length; i++) {

  //     const inputValuePartDash = inputValuePartComma[i].split('-');

  //     if (inputValuePartDash.length === 2) {

  //       const startPartDash = parseInt(inputValuePartDash[0]);
  //       const endPartDash = parseInt(inputValuePartDash[1]);

  //       if (!startPartDash && endPartDash * -1 < optionsDataIds[0]) {
  //         alert('no');
  //         return;
  //       }
  //       for (let j = startPartDash; j <= endPartDash; j++) {
  //         const optionData = optionsData.find((m) => m.id === j);
  //         // if (!optionData) {
  //         //   alert('Введите число от 0 до 59');
  //         //   return;
  //         // }
  //         if (uniqueInputData.includes(j)) {
  //           alert('Значения минут должны быть уникальнымиBBBBBBBBBBB');
  //           return;
  //         }
  //         uniqueInputData.push(j);
  //         if (optionData) {
  //           selectedMinutesInInput.push(optionData);
  //   //         dispatch(dispatchChangeValue(selectedMinutesInInput));
  //   // setInputData('');
  //         } else {
  //           alert('Введите число от 0 до 5999999');
  //           return inputData

  //         }
  //       }
  //     } else {
  //       const num = parseInt(inputValuePartComma[i]);

  //       const optionData = optionsData.find((m) => m.id === num);
  //       if (optionData || inputStringValue === '*' || inputStringValue === '') {
  //         if (uniqueInputData.includes(num)) {
  //           alert('Значения минут должны быть уникальнымиUUUUUUUUUU');
  //           return inputData
  //         } if (!uniqueInputData.includes(num)) {

  //           selectedMinutesInInput.push(
  //             optionData || inputStringValue === '*' || inputStringValue === ''
  //           );
  //     //       dispatch(dispatchChangeValue(selectedMinutesInInput));
  //     // setInputData('');
  //         }
  //         uniqueInputData.push(num);

  //       } else {
  //         alert('Введите число от 0 до 59');
  //         return;
  //       }
  //     }
  //   }
  //   // dispatch(changeMinutesValue(selectedMinutesInInput));
  //   // dispatch(changeMinutesValue(dispatchChangeValue));
  //   /* dispatch(dispatchChangeValue(selectedMinutesInInput));
  //   setInputData(''); */
  //   dispatch(dispatchChangeValue(selectedMinutesInInput));
  //     setInputData('');
  // };

  /* const inputString = '1-5';
  const range = inputStringMinutes.split('-');
  const resultArray = [];
  const ll = () => {
    minutes.forEach((day) => {
      if (day.title === range[0] || day.title === range[1]) {
        resultArray.push(day);
      } else if (
        day.id > minutes.find((item) => item.title === range[0]).id &&
        day.id < minutes.find((item) => item.title === range[1]).id
      ) {
        resultArray.push(day);
      }
      dispatch(changeMinutesValue(resultArray));
    });
  }; */
  // console.log({ range });
  // console.log({ resultArray });

  // ----------- РАБОЧЕЕ вверху ----------------

  const [error, setError] = useState(false);

  const validateSelectedOptions = (
    inputStringValue,
    optionsData,
    dispatchChangeValue,
    selectedMinutesInInput
  ) => {
    if (inputStringValue === '*') {
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
        console.log({ num });
        const optionData = optionsData.find((m) => m.title === num);
        if (!optionData) {
          setError(true);
          hasError = true;
        } else {
          if (optionData || inputStringValue === '*' || inputStringValue === '') {
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
