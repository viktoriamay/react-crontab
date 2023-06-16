import {
  CHANGE_WEEKDAY_VALUE,
  CHANGE_WEEKDAY_VISIBILITY,
  CLEAR_WEEKDAY_VALUE,
} from '../types/types';

export const changeWeekdayValue = (value) => {
  return {
    type: CHANGE_WEEKDAY_VALUE,
    payload: value,
  };
};

export const changeWeekdayVisibility = (isVisibleWeekdays) => ({
  type: CHANGE_WEEKDAY_VISIBILITY,
  isVisibleWeekdays,
});

export const clearWeekdayValue = () => ({
  type: CLEAR_WEEKDAY_VALUE,
});
