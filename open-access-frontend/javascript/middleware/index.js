import { ActionTypes, ActionCreators } from '../actions';

export default [
  store => next => action => {
    next(action);
  }
];
