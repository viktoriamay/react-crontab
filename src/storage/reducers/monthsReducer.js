import {
  CHANGE_MONTHS_VALUE,
  CHANGE_MONTHS_VISIBILITY,
  CLEAR_WEEKDAY_VALUE,
} from '../types/types';

const initialState = {
  selectedMonths: [],
  isVisibleMonths: false,
};

export const monthsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MONTHS_VALUE:
      return { ...state, selectedMonths: action.payload };
    case CLEAR_WEEKDAY_VALUE:
      return { ...state, selectedMonths: [] };
    case CHANGE_MONTHS_VISIBILITY:
      return {
        ...state,
        isVisibleMonths: action.isVisibleMonths,
      };
    default:
      return state;
  }
};
