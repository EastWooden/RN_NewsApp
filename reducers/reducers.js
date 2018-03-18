import { combineReducers } from 'redux';
import { ISSHOWTAB } from '../actions/actionsTypes';

// 原始默认state
const defaultState = {
  isShowtab: true,
}
function showTab (state = defaultState,action) {
  switch (action.type) {
    case ISSHOWTAB:
      return { ...state, isShowtab:!state.isShowtab };  
    default:
      return state;
  }
}

export default combineReducers ({
  showTab
});