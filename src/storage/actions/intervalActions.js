import {
  CHANGE_HOURS_INTERVAL_VALUE,
  CHANGE_MINUTES_INTERVAL_VALUE,
  CHANGE_MONTHDAYS_INTERVAL_VALUE,
  CHANGE_MONTHS_INTERVAL_VALUE,
  CHANGE_WEEKDAYS_INTERVAL_VALUE,
  CLEAR_INTERVAL_VALUE,
} from '../types/types';

export const changeMinutesIntervalValue = (value) => {
  return {
    type: CHANGE_MINUTES_INTERVAL_VALUE,
    payload: value,
  };
};
export const changeHoursIntervalValue = (value) => {
  return {
    type: CHANGE_HOURS_INTERVAL_VALUE,
    payload: value,
  };
};
export const changeWeekdaysIntervalValue = (value) => {
  return {
    type: CHANGE_WEEKDAYS_INTERVAL_VALUE,
    payload: value,
  };
};
export const changeMonthdaysIntervalValue = (value) => {
  return {
    type: CHANGE_MONTHDAYS_INTERVAL_VALUE,
    payload: value,
  };
};
export const changeMonthsIntervalValue = (value) => {
  return {
    type: CHANGE_MONTHS_INTERVAL_VALUE,
    payload: value,
  };
};

export const clearIntervalValue = () => ({
  type: CLEAR_INTERVAL_VALUE,
});
