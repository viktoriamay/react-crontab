import { useState } from 'react';
import './App.css';
import { Schedule } from './components/Schedule/Schedule';

/* Команда в cron-формате представляет собой ряд из 5 чисел или групп чисел, разделенных пробелами и означающих

минута час день месяца месяц день недели */

function App() {
  const [time, setTime] = useState('');
  const [hour, minute] = time.split(':').map((str) => str.replace(/^0/, ''));

  const [day, setDay] = useState('');
  const [year, month, dayMonth] = day
    .split('-')
    .map((str) => str.replace(/^0/, ''));

  // console.log(hours, minutes, time);
  const [weekDay, setWeekDay] = useState(['']);
  // const handleWeekDaysChange = (e) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions).map(
  //     (option) => option.value
  //   );
  //   setWeekDay(selectedOptions);
  // };

  const [interval, setInterval] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      minute,
      hour,
      dayMonth,
      month,
      weekDay,

      interval,
    };
    // console.log({ data });
    //   // сохранение данных в базу данных или отправка на сервер
  };

  // Преобразование дня недели в формат cron строки
  const daysOfWeek = [
    {
      name: 'Sunday',
      id: 0,
      day: 'SUN',
    },

    {
      name: 'Monday',
      id: 1,
      day: 'MON',
    },
    {
      name: 'Tuesday',
      id: 2,
      day: 'TUE',
    },
    {
      name: 'Wednesday',
      id: 3,
      day: 'WED',
    },
    {
      name: 'Thursday',
      id: 4,
      day: 'THU',
    },
    {
      name: 'Friday',
      id: 5,
      day: 'FRI',
    },
    {
      name: 'Saturday',
      id: 6,
      day: 'SAT',
    },
  ];

  // const dayOfWeekCron = weekDay
  //   .map((dayName) => daysOfWeek.find((day) => day.name === dayName))
  //   .map((day) => day.day);
  // .join(',');

  const getWeekDayRange = (weekDays) => {
    const sortedDays = weekDays
      .map((dayName) => daysOfWeek.find((day) => day.name === dayName))
      .sort((a, b) => a.id - b.id);

    let rangeStart = null;
    let rangeEnd = null;

    const ranges = sortedDays.reduce((acc, day, index) => {
      if (rangeStart === null) {
        rangeStart = day;
        rangeEnd = day;
      } else if (day.id === rangeEnd.id + 1) {
        rangeEnd = day;
      } else {
        if (rangeStart === rangeEnd) {
          acc.push(rangeStart.day);
        } else {
          acc.push(`${rangeStart.day}-${rangeEnd.day}`);
        }
        rangeStart = day;
        rangeEnd = day;
      }

      if (index === sortedDays.length - 1) {
        if (rangeStart === rangeEnd) {
          acc.push(rangeStart.day);
        } else {
          acc.push(`${rangeStart.day}-${rangeEnd.day}`);
        }
      }

      return acc;
    }, []);

    return ranges.join(',');
  };

  const handleWeekDaysChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    const weekDayRange = getWeekDayRange(selectedOptions);

    setWeekDay(weekDayRange);
  };

  if (weekDay.length === 1 && weekDay[0] === '') {
    return setWeekDay('');
  }

  // // Преобразование интервала в формат cron строки
  // const intervalCron = interval ? `*/${interval}` : undefined;
  const cron = (data) => {
    return data ? data : '*';
  };

  const cronInterval = (interval, minute) => {
    // if (minute < 1 && interval > 0) {
      // return `${minute}/${interval}`;
    // } 
    // 
    // else 
    
    if (minute) {
      return minute;
    } else if (interval > 0) {
      return `*/${interval}`;
    } else {
      return '*';
    }
  };

  // минута час день месяца месяц день недели
  //
  // // Сборка строки cron
  const cronString = [
    cronInterval(interval, minute),
    cron(hour),
    cron(dayMonth),
    cron(month),
    cron(weekDay),
  ].join(' ');

  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit}>
        <select name="" id="" onChange={handleWeekDaysChange} multiple>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <input multiple
          type="time"
          name=""
          id=""
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="date"
          name=""
          id=""
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="30"
          name=""
          id=""
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        />
        <button>save</button>
      </form>

      <p>{cronString}</p> */}

      <Schedule />
    </div>
  );
}

export default App;
