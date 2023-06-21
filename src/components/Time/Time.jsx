import { useDispatch, useSelector } from 'react-redux';
import { hours, minutes } from '../../data/data';
import {
  changeHoursValue,
  changeHoursVisibility,
  clearHoursValue,
} from '../../storage/actions/hoursActions';
import { useRef } from 'react';
import {
  changeMinutesValue,
  clearMinutesValue,
} from '../../storage/actions/minutesActions';
import { changeWeekdayVisibility } from '../../storage/actions/weekdaysActions';
import { changeMonthdaysVisibility } from '../../storage/actions/monthdaysActions';
import { changeMonthsVisibility } from '../../storage/actions/monthsActions';

export const Time = () => {
  const dispatch = useDispatch();
  
  const hoursRef = useRef();

  const handleHoursChange = (event) => {
    const selectedOptions = [...event.target.selectedOptions];
    const selectedHours = selectedOptions.map((option) => {
      const { name, id, title } = hours.find(
        (day) => day.name === option.value
      );
      return { name, id, title };
    });
    dispatch(changeHoursValue(selectedHours));
  };

  const handleMinutesChange = (event) => {
    const selectedOptions = [...event.target.selectedOptions];
    const selectedMinutes = selectedOptions.map((option) => {
      const { name, id, title } = minutes.find(
        (day) => day.name === option.value
      );
      return { name, id, title };
    });
    dispatch(changeMinutesValue(selectedMinutes));
  };

  const activeTime = useSelector((state) => state.hoursOptions.isVisibleHours);

  const handleActiveTime = (e) => {
    dispatch(changeHoursVisibility(!activeTime));
    e.stopPropagation();
    dispatch(changeWeekdayVisibility(false));
    dispatch(changeMonthdaysVisibility(false));
    dispatch(changeMonthsVisibility(false));
  };

  const minutesRef = useRef();

  const handleClearHours = () => {
    dispatch(clearHoursValue());
    dispatch(clearMinutesValue());
    hoursRef.current.selectedIndex = -1;
    minutesRef.current.selectedIndex = -1;
  };

  return (
    <div className="content__selector">
      <div className="content__selector_buttons">
        <button className="content__selector_input" onClick={handleActiveTime}>
          HH:MM
        </button>
        <button className="content__selector_button" onClick={handleClearHours}>
          Clear
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={activeTime ? 'content__selects active' : 'content__selects'}
      >
        <select
          name="hours"
          id="hours"
          multiple
          size={7}
          ref={hoursRef}
          onChange={handleHoursChange}
          className="content__select content__select_time"
        >
          {hours.map((hour) => (
            <option
              className="content__option"
              key={`hour-${hour.name}`}
              id={hour.id}
              value={hour.name}
            >
              {hour.name}
            </option>
          ))}
        </select>
        <select
          name="minutes"
          id="minutes"
          multiple
          size={7}
          ref={minutesRef}
          onChange={handleMinutesChange}
          className="content__select content__select_time"
        >
          {minutes.map((minute) => (
            <option
              className="content__option"
              key={`minute-${minute.name}`}
              id={minute.id}
              value={minute.name}
            >
              {minute.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


// import { useEffect, useState } from 'react';
// import { useCronString } from '../../hooks/useCronString';
// import { useCopyToClipboard } from 'react-use';
// import './CronData.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeMinutesIntervalValue } from '../../storage/actions/intervalActions';
// import { changeMinutesValue } from '../../storage/actions/minutesActions';
// import { minutes } from '../../data/data';

// export const CronData = () => {
//   const { cronString } = useCronString();

//   const [state, copyToClipboard] = useCopyToClipboard();

//   const [inputData, setInputData] = useState('');
//   const [savedData, setSavedData] = useState([]);

//   const handleScheduleSave = () => {
//     setInputData(cronString);
//   };
//   const dispatch = useDispatch();
//   const selectedMinutes = useSelector(
//     (state) => state.minutesOptions.selectedMinutes
//   );

//   // console.log({selectedMinutes});

//   const inputStringMinutes = inputData.split(' ')[0];
//   const inputStringHours = inputData.split(' ')[1];
//   const inputStringDays = inputData.split(' ')[2];
//   const inputStringMonths = inputData.split(' ')[3];
//   const inputStringWeekdays = inputData.split(' ')[4];

//   // console.log({ inputStringMinutes });

//   // else inputStringMinutes.includes('/')) не содержит / - работаем с форматом минут
//   const str = '1-3,6,10-12'; // это inputStringMinutes для наглядности
//   const minutesIds = minutes.map((minute) => minute.id); // получаю все айди в массиве минут, чтобы потом найти в нем вводимое число

//   console.log({minutesIds});
//   const selectedMinutesInInput = []; // это новый массив на основании 1-4,6,8, который будем преобразовывать к виду 1, 2, 3, 4, 6, 8

//   const minutesPartComma = inputStringMinutes.split(','); // разбиваю строку в инпуте на массив вида ['1-3', '6', '10-12']
//   for (let i = 0; i < minutesPartComma.length; i++) {
//     // цикл нужен для того, чтобы разбить далее по знаку "-" каждую строку полученную в массиве
//     const minutesPartDash = minutesPartComma[i].split('-'); // разбиваю каждый элемент массива по знаку "-"
//     if (minutesPartDash.length === 2) {
//       // проверка чтобы гонять только интервал значений
//       const startPartDash = parseInt(minutesPartDash[0], 10); // `parseInt` более явно показывает нам, что мы преобразуем строку в число
//       const endPartDash = parseInt(minutesPartDash[1], 10); // 10 в функции `parseInt` означает, что мы используем систему исчисления с основанием 10 (десятичную систему)

//       for (let index = startPartDash; index <= endPartDash; index++) {
//         const minuteFindById = minutes.find((minute) => minute.id === index); // ищем все ОБЪЕКТЫ в массиве minutes, которые содержат id === index (то есть те значения которые указаны через "-") и возвращаем тоже ОБЪЕКТЫ
//         if (minuteFindById) {
//           selectedMinutesInInput.push(minuteFindById); // создаем диапазон ОБЪЕКТОВ, найденных по диапазону чисел (диапазон чисел сравниваем с айди объекта) от начального значения (6-8) до конечного и добавляем все их в массив selectedMinutesInInput
//         } else {
//           alert('Введите число от 0 до 59');
//           // return;
//         }
//       }
//     } else {
//       const minuteFindById = minutes.find((minute) => minute.id === i); // ищем все ОБЪЕКТЫ в массиве minutes, которые содержат id === i (то есть те значения которые указаны через ",") и возвращаем тоже ОБЪЕКТЫ
  
//       if (minuteFindById) {
//           selectedMinutesInInput.push(minuteFindById); // так как это условие minutesPartDash.length !== 2, то мы пушим только те элементы minutesPartDash, длина которых равно 1 (например "6")

//       } else {

//       }
//     }
//   }
//   const handleScheduleLoad = () => {
//     // if (inputStringMinutes.includes('/')) {
//     //   // получаем первое значение и последнее
//     //   const first = inputStringMinutes.split('/')[0];
//     //   const last = +inputStringMinutes.split('/')[1];
//     //   // и если это число больше нуля (тк нельзя ввести отрицательный интервал) и первое значение содержит * то мы диспатчим значение минутсИнтервал
//     //   if (last > 0 && first === '*') {
//     //     dispatch(changeMinutesIntervalValue(last));
//     //     setInputData('');
//     //     //если нет, то выводим алерт и не позволяем отправить данные
//     //   } else {
//     //     alert('invalid format');
//     //   }
//     //   // в ином случае работаем с форматом минут
//     // } else {
//     //   for (let i = 0; i < minutesPartComma.length; i++) {
//     //     // цикл нужен для того, чтобы разбить далее по знаку "-" каждую строку полученную в массиве
//     //     const minutesPartDash = minutesPartComma[i].split('-'); // разбиваю каждый элемент массива по знаку "-"
//     //     if (minutesPartDash.length === 2) {
//     //       // проверка чтобы гонять только интервал значений
//     //       const startPartDash = parseInt(minutesPartDash[0], 10); // `parseInt` более явно показывает нам, что мы преобразуем строку в число
//     //       const endPartDash = parseInt(minutesPartDash[1], 10); // 10 в функции `parseInt` означает, что мы используем систему исчисления с основанием 10 (десятичную систему)

//     //       for (let index = startPartDash; index <= endPartDash; index++) {
//     //         const minuteFindById = minutes.find(
//     //           (minute) => minute.id === index
//     //           ); // ищем все ОБЪЕКТЫ в массиве minutes, которые содержат id === index (то есть те значения которые указаны через "-") и возвращаем тоже ОБЪЕКТЫ
//     //         if (minutesIds.includes(index)) {
//     //           selectedMinutesInInput.push(minuteFindById); // создаем диапазон ОБЪЕКТОВ, найденных по диапазону чисел (диапазон чисел сравниваем с айди объекта) от начального значения (6-8) до конечного и добавляем все их в массив selectedMinutesInInput
//     //           dispatch(changeMinutesValue(selectedMinutesInInput)); // и теперь полученный массив мы диспатчим в minutesValue
//     //         } else {
//     //           alert('Введите число от 0 до 59');
//     //           return;
//     //         }
//     //       }
//     //     } else {
//     //       const minuteFindById = minutes.find((minute) => minute.id === i); // ищем все ОБЪЕКТЫ в массиве minutes, которые содержат id === i (то есть те значения которые указаны через ",") и возвращаем тоже ОБЪЕКТЫ

//     //       if (minutesIds.includes(i)) {
//     //         selectedMinutesInInput.push(minuteFindById); // так как это условие minutesPartDash.length !== 2, то мы пушим только те элементы minutesPartDash, длина которых равно 1 (например "6")
//     //         dispatch(changeMinutesValue(selectedMinutesInInput)); // и теперь полученный массив мы диспатчим в minutesValue
//     //       } else {
//     //         alert('Введите число от 0 до 59');
//     //         return;
//     //       }
//     //     }
//     //   }
//     // }
//     const selectedMinutess = [];
//     const aaa = minutes.map(m=> m.id)
//     const parts = inputStringMinutes.split(',');
//     for (let i = 0; i < parts.length; i++) {
//       const range = parts[i].split("-");
//       if (range.length === 2) {
//         const start = parseInt(range[0]);
//         const end = parseInt(range[1]);
//         for (let j = start; j <= end; j++) {
//           const minute = minutes.find((m) => m.id === j);
//           if (!aaa.includes(j)) {
//             alert("Введите число от 0 до 59");
//             return 
//           }
//           if (minute) {
//             selectedMinutess.push(minute);
//           }
//         }
//       } else {
//         const num = parseInt(parts[i]);
//         if (num < 0 || num > 59) {
//           alert("Введите число от 0 до 59");
//           return 

//         }
//         const minute = minutes.find((m) => m.id === num);
//         if (minute) {
//           selectedMinutess.push(minute);
//         }
//       }
//     }
//   };
  
//   // debugger
//   console.log({ selectedMinutesInInput });
//  /* 
//   const d = (inputStringMinutes) => {
//      const selectedMinutess = [];
//     const aaa = minutes.map(m=> m.id)
//     const parts = inputStringMinutes.split(',');
//     for (let i = 0; i < parts.length; i++) {
//       const range = parts[i].split("-");
//       if (range.length === 2) {
//         const start = parseInt(range[0]);
//         const end = parseInt(range[1]);
//         for (let j = start; j <= end; j++) {
//           const minute = minutes.find((m) => m.id === j);
//           if (!aaa.includes(j)) {
//             alert("Введите число от 0 до 59");
//             return 
//           }
//           if (minute) {
//             selectedMinutess.push(minute);
//           }
//         }
//       } else {
//         const num = parseInt(parts[i]);
//         if (num < 0 || num > 59) {
//           alert("Введите число от 0 до 59");
//           return 

//         }
//         const minute = minutes.find((m) => m.id === num);
//         if (minute) {
//           selectedMinutess.push(minute);
//         }
//       }
//     }
//   };

//   d(inputStringMinutes) */

//   const first = inputStringMinutes.split('/')[0];
//   // console.log({ first });
//   // console.log(iii === '*');
//   // console.log(first === '*');

//   // const handleScheduleLoad = () => {
//   // если первый элемент массива (разделенной строки), в данном случае число введенное в инпут (минуты) содержит /, то (работаем с форматом интервала)
//   // if (inputStringMinutes.includes('/')) {
//   //   // получаем первое значение и последнее
//   //   const first = inputStringMinutes.split('/')[0];
//   //   const last = +inputStringMinutes.split('/')[1];
//   //   // и если это число больше нуля (тк нельзя ввести отрицательный интервал) и первое значение содержит * то мы диспатчим значение минутсИнтервал
//   //   if (last > 0 && first === '*') {
//   //     dispatch(changeMinutesIntervalValue(last));
//   //     setInputData('');
//   //     //если нет, то выводим алерт и не позволяем отправить данные
//   //   } else {
//   //     alert('invalid format');
//   //   }
//   //   // в ином случае работаем с форматом минут
//   // } else {
//   //   for (let i = 0; i < minutesPartComma.length; i++) {
//   //     // цикл нужен для того, чтобы разбить далее по знаку "-" каждую строку полученную в массиве
//   //     const minutesPartDash = minutesPartComma[i].split('-'); // разбиваю каждый элемент массива по знаку "-"
//   //     if (minutesPartDash.length === 2) {
//   //       // проверка чтобы гонять только интервал значений
//   //       const startPartDash = parseInt(minutesPartDash[0], 10); // `parseInt` более явно показывает нам, что мы преобразуем строку в число
//   //       const endPartDash = parseInt(minutesPartDash[1], 10); // 10 в функции `parseInt` означает, что мы используем систему исчисления с основанием 10 (десятичную систему)

//   //       for (let index = startPartDash; index <= endPartDash; index++) {
//   //         const minuteFindById = minutes.find(
//   //           (minute) => minute.id === index
//   //         ); // ищем все ОБЪЕКТЫ в массиве minutes, которые содержат id === index (то есть те значения которые указаны через "-") и возвращаем тоже ОБЪЕКТЫ
//   //         if (minutesIds.includes(index)) {
//   //           selectedMinutesInInput.push(minuteFindById); // создаем диапазон ОБЪЕКТОВ, найденных по диапазону чисел (диапазон чисел сравниваем с айди объекта) от начального значения (6-8) до конечного и добавляем все их в массив selectedMinutesInInput
//   //         } else {
//   //           alert('Введите число от 0 до 59');
//   //           // return;
//   //         }
//   //       }
//   //     } else {
//   //       const minuteFindById = minutes.find((minute) => minute.id === i); // ищем все ОБЪЕКТЫ в массиве minutes, которые содержат id === i (то есть те значения которые указаны через ",") и возвращаем тоже ОБЪЕКТЫ

//   //       if (minutesIds.includes(i)) {
//   //         selectedMinutesInInput.push(minuteFindById); // так как это условие minutesPartDash.length !== 2, то мы пушим только те элементы minutesPartDash, длина которых равно 1 (например "6")
//   //       } else {
//   //       }
//   //     }
//   //   }

//   // dispatch(changeMinutesValue(selectedMinutesInInput)); // и теперь полученный массив мы диспатчим в minutesValue
//   // setInputData('');
//   // }
//   // setInputData(cronString);
//   // };

//   console.log({ selectedMinutesInInput });
//   useEffect(() => {
//     if (cronString === '* * * * *') {
//       setInputData('');
//     } else {
//       setInputData(cronString);
//     }
//   }, []);

//   useEffect(() => {
//     const savedDataFromLocalStorage = localStorage.getItem('savedData');
//     if (savedDataFromLocalStorage) {
//       setSavedData(JSON.parse(savedDataFromLocalStorage));
//     }
//   }, []);

//   const handleAddClick = () => {
//     if (inputData.trim() !== '') {
//       const updatedData = [...savedData, inputData];
//       setSavedData(updatedData);
//       setInputData('');
//       localStorage.setItem('savedData', JSON.stringify(updatedData));
//     }
//   };

//   return (
//     <div className="crondata">
//       <div className="crondata__buttons_wrapper">
//         <input
//           className="content__selector_buttons content__selector_input crondata__input"
//           type="text"
//           value={inputData}
//           onChange={(e) => setInputData(e.target.value)}
//         />
//         <div className="crondata__buttons">
//           <button
//             className="content__selector_button 
            
//             "
//             onClick={handleScheduleLoad}
//           >
//             Load
//           </button>
//           <button
//             className="content__selector_button "
//             onClick={handleScheduleSave}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
