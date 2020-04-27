export const ActionTypes = {
  CLEAR_ERRORS: "CLEAR_ERRORS",
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  AUTO_LOGIN: "AUTO_LOGIN",
  LOGOUT: "LOGOUT",
};

export const ActionCreators = {
  clearErrors: () => {
    return { type: ActionTypes.CLEAR_ERRORS };
  },
  loginStart: (credentials) => {
    return { type: ActionTypes.LOGIN_START, payload: { credentials } };
  },
  loginSuccess: (token) => {
    return { type: ActionTypes.LOGIN_SUCCESS, payload: { token } };
  },
  loginError: (error) => {
    return { type: ActionTypes.LOGIN_ERROR, error };
  },
  autoLogin: (token) => {
    return { type: ActionTypes.AUTO_LOGIN, payload: { token } };
  },
  logout: () => {
    return { type: ActionTypes.LOGOUT };
  },
};
