import { ActionTypes, ActionCreators } from "../actions";
import axios from "axios";

export default [
  (store) => (next) => (action) => {
    next(ActionCreators.clearErrors());
    switch (action.type) {
      case ActionTypes.LOGIN_START:
        axios
          .post("auth/login", action.payload.credentials)
          .then((res) => {
            if (res.data.auth)
              next(ActionCreators.loginSuccess(res.data.token));
            else throw new Error("authentication failed!");
          })
          .catch((err) => next(ActionCreators.loginError(err)));
        break;
      default:
        next(action);
        break;
    }
  },
];
