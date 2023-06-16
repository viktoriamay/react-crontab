import {
  CHANGE_HOURS_VALUE,
  CHANGE_HOURS_VISIBILITY,
  CLEAR_HOURS_VALUE,
} from '../types/types';

export const changeHoursValue = (value) => {
  return {
    type: CHANGE_HOURS_VALUE,
    payload: value,
  };
};

export const changeHoursVisibility = (isVisibleHours) => ({
  type: CHANGE_HOURS_VISIBILITY,
  isVisibleHours,
});

export const clearHoursValue = () => ({
  type: CLEAR_HOURS_VALUE,
});
