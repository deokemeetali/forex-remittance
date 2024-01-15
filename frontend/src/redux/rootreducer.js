import { combineReducers } from 'redux';
import { mongodbReducer, authReducer } from './reducer';

const rootReducer = combineReducers({
  mongodb: mongodbReducer,
  auth: authReducer,

});

export default rootReducer;
