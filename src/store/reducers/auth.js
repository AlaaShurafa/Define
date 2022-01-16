import {
  IS_LOGGED_REQUEST,
  IS_LOGGED_SUCCESS,
  IS_LOGGED_FAILURE,

  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,

  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,

  UPDATE_USER_DATA_SUCCESS,
  
  FETCH_USER_DATA_FAILURE,
  LOGIN_GUEST

}
  from '../actions/types';


const INITIAL_STATE = {

  isLoading: true,
  isLoggedIn: false,

  user:undefined
}

const auth = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN_GUEST:
      return { ...state, isLoggedIn: payload.start, isLoading: false };

    case IS_LOGGED_REQUEST:
      return { ...state, isLoading: true, isLoggedIn: false };
    case IS_LOGGED_SUCCESS:
      return {
        ...state, isLoading: false, isLoggedIn: true,
        user: payload.user
      };
    case IS_LOGGED_FAILURE:
      return { ...state, isLoading: false, isLoggedIn: false };

      
    case LOGIN_USER_SUCCESS:
      return { ...state, user:payload.user, isLoggedIn:true}

    case UPDATE_USER_DATA_SUCCESS:
      return { ...state, user:payload.user}

    case SIGNUP_USER_SUCCESS:
      return { ...state, user:payload.user, isLoggedIn:true}
    case LOGOUT_USER_SUCCESS : 
      return {...INITIAL_STATE, isLoading:false} 
    default:
      return state;
  }
};
export default auth;