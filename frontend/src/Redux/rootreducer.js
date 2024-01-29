import { combineReducers } from 'redux';
import { loginReducer } from './reducer';

const rootReducer = combineReducers({
    login:loginReducer
})
export default rootReducer;