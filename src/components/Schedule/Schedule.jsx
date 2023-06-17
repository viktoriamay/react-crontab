import { useDispatch } from 'react-redux';
import { IntervalSchedule } from '../IntervalSchedule/IntervalSchedule';
import { WeeklySchedule } from '../WeeklySchedule/WeeklySchedule';
import { DailySchedule } from '../DailySchedule/DailySchedule';
import { MonthlySchedule } from '../MonthlySchedule/MonthlySchedule';
import { CustomSchedule } from '../CustomSchedule/CustomSchedule';
import { useState } from 'react';
import { CronString } from '../CronString/CronString';
import { clearIntervalValue } from '../../storage/actions/intervalActions';
import { clearMinutesValue } from '../../storage/actions/minutesActions';
import { clearHoursValue } from '../../storage/actions/hoursActions';
import { clearMonthdaysValue } from '../../storage/actions/monthdaysActions';
import { clearMonthsValue } from '../../storage/actions/monthsActions';
import { clearWeekdayValue } from '../../storage/actions/weekdaysActions';
import './Schedule.scss';

export const Schedule = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  const handleTabClick = (index) => {
    setActiveTab(index);
    dispatch(clearIntervalValue());
    dispatch(clearMinutesValue());
    dispatch(clearHoursValue());
    dispatch(clearMonthdaysValue());
    dispatch(clearMonthsValue());
    dispatch(clearWeekdayValue());
  };

  const tabs = [
    {
      label: 'Interval',
      content: <IntervalSchedule />,
    },
    {
      label: 'Daily',
      content: <DailySchedule />,
    },
    {
      label: 'Weekly',
      content: <WeeklySchedule />,
    },
    {
      label: 'Monthly',
      content: <MonthlySchedule />,
    },
    {
      label: 'Custom',
      content: <CustomSchedule />,
    },
  ];

  return (
    <div className="schedule">
      <ul className="schedule__tabs">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={
              activeTab === index ? `active schedule__tab ` : `schedule__tab `
            }
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div>{tabs[activeTab].content}</div>
      <CronString />
    </div>
  );
};
