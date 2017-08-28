import * as types from './ActionTypes';
import axios from 'axios';

//Login.
export function authCheckRequest() {
  return (dispatch) => {
    return axios.post('/link_start').then((res) => {
      // console.log(res.data);
      if(res.data.status == "success"){
        dispatch(loginSuccess(res.data.username,res.data.user_profile));
      }else{
        dispatch(loginFailure());
      }
    }).catch((err) => {
      dispatch(loginFailure());
    })
  }
}

export function loginSuccess(username,user_profile) {
  return {
      type: types.AUTH_LOGIN_SUCCESS,
      username,
      user_profile
  };
}

export function loginFailure() {
  return {
      type: types.AUTH_LOGIN_FAILURE
  };
}