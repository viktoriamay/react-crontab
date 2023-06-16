import {
  CHANGE_HOURS_VALUE,
  CHANGE_HOURS_VISIBILITY,
  CLEAR_HOURS_VALUE,
} from '../types/types';

const initialState = {
  selectedHours: [],
  isVisibleHours: false,
};

export const hoursReducer = (state = initialState, action) => { 
  switch (action.type) {
    case CHANGE_HOURS_VALUE:
      return { ...state, selectedHours: action.payload };
    case CLEAR_HOURS_VALUE:
      return { ...state, selectedHours: [] };
    case CHANGE_HOURS_VISIBILITY:
      return {
        ...state,
        isVisibleHours: action.isVisibleHours,
      };
    default:
      return state;
  }
};
