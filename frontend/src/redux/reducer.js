import {
    SET_POSTGRE_DATA, LOGIN_SUCCESS, LOGOUT,
  } from './action';
  
  const initialState1 = {
    user: null,
    isAuthenticated: false,
  };
  
  export function authReducer(state = initialState1, { type, payload } = {}) {
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: payload,
        };
      case LOGOUT:
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  }
  
  const initialState = {
    mongodbData: [],
  };
  
  export function mongodbReducer(state = initialState, { type, payload } = {}) {
    switch (type) {
      case SET_POSTGRE_DATA:
        return {
          ...state,
          mongodbData: payload,
        };
      case LOGOUT:
        return {
          ...state,
          mongodbData: [],
        };
      default:
        return state;
    }
  }
  
 