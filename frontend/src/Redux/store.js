import { createStore } from 'redux';
// import thunk from 'redux-thunk'; 
import rootReducer from './rootreducer';

//const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
    rootReducer
  );
export default store;
