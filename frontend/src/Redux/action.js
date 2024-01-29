export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const login = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
  });