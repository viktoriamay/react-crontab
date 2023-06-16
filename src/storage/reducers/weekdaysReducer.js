import {
  CHANGE_WEEKDAY_VALUE,
  CHANGE_WEEKDAY_VISIBILITY,
  CLEAR_WEEKDAY_VALUE,
} from '../types/types';

const initialState = {
  selectedWeekdays: [],
  isVisibleWeekdays: false,
};

export const weekdaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_WEEKDAY_VALUE:
      return { ...state, selectedWeekdays: action.payload };
    case CLEAR_WEEKDAY_VALUE:
      return { ...state, selectedWeekdays: [] };
    case CHANGE_WEEKDAY_VISIBILITY:
      return {
        ...state,
        isVisibleWeekdays: action.isVisibleWeekdays,
      };
    default:
      return state;
  }
};
