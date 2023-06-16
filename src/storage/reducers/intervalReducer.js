import {
  CHANGE_HOURS_INTERVAL_VALUE,
  CHANGE_MINUTES_INTERVAL_VALUE,
  CHANGE_MONTHDAYS_INTERVAL_VALUE,
  CHANGE_MONTHS_INTERVAL_VALUE,
  CHANGE_WEEKDAYS_INTERVAL_VALUE,
  CLEAR_INTERVAL_VALUE,
} from '../types/types';

const initialState = {
  minutesIntervalValue: 0,
  hoursIntervalValue: 0,
  weekdaysIntervalValue: 0,
  monthdaysIntervalValue: 0,
  monthsIntervalValue: 0,
};

export const intervalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MINUTES_INTERVAL_VALUE:
      return {
        ...state,
        minutesIntervalValue: action.payload,
      };
    case CHANGE_HOURS_INTERVAL_VALUE:
      return {
        ...state,
        hoursIntervalValue: action.payload,
      };
    case CHANGE_WEEKDAYS_INTERVAL_VALUE:
      return {
        ...state,
        weekdaysIntervalValue: action.payload,
      };
    case CHANGE_MONTHDAYS_INTERVAL_VALUE:
      return {
        ...state,
        monthdaysIntervalValue: action.payload,
      };
    case CHANGE_MONTHS_INTERVAL_VALUE:
      return {
        ...state,
        monthsIntervalValue: action.payload,
      };
    case CLEAR_INTERVAL_VALUE:
      return {
        ...state,
        minutesIntervalValue: 0,
        hoursIntervalValue: 0,
        weekdaysIntervalValue: 0,
        monthdaysIntervalValue: 0,
        monthsIntervalValue: 0,
      };
    default:
      return state;
  }
};
