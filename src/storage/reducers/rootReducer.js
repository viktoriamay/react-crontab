import { combineReducers } from 'redux';
import { intervalReducer } from './intervalReducer';
import { minutesReducer } from './minutesReducer';
import { hoursReducer } from './hoursReducer';
import { weekdaysReducer } from './weekdaysReducer';
import { monthdaysReducer } from './monthdaysReducer';
import { monthsReducer } from './monthsReducer';

export const rootReducer = combineReducers({
  interval: intervalReducer,
  minutesOptions: minutesReducer,
  hoursOptions: hoursReducer,
  weekdayOptions: weekdaysReducer,
  monthdaysOptions: monthdaysReducer,
  monthsOptions: monthsReducer,
});
