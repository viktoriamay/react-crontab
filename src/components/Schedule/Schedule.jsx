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
      label: 'IntervalSchedule',
      content: <IntervalSchedule />,
    },
    {
      label: '<DailySchedule />',
      content: <DailySchedule />,
    },
    {
      label: '<WeeklySchedule />',
      content: <WeeklySchedule />,
    },
    {
      label: '<MonthlySchedule />',
      content: <MonthlySchedule />,
    },
    {
      label: '<CustomSchedule />',
      content: <CustomSchedule />,
    },
  ];

  return (
    <>
      <ul className="explore_page__navlink_container">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={
              activeTab === index
                ? `active explore_page__navlink `
                : `explore_page__navlink `
            }
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div>{tabs[activeTab].content}</div>
      <CronString />
    </>
  );
};
