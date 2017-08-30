import * as types from './ActionTypes';
import axios from 'axios';

//Login.
export function loginRequest(data){
  return (dispatch) => {
    return axios.post('/login',data).then((res) => {
      if(res.data.status == "success"){
        dispatch(loginSuccess(res.data.userid));
      }else{
        dispatch(loginFailure());
      }
    }).catch((err) => {
      dispatch(loginFailure());
    });
  }
}
//Logout.
export function logoutRequest(){
  return (dispatch) => {
    return axios.post('/logout').then((res) => {
      if(res.data.status == "success"){
        dispatch(loginFailure());
      }else{
        return false;
      }
    }).catch((err) => {
      return false;
    });
  }
}

export function authCheckRequest() {
  return (dispatch) => {
    return axios.post('/auth').then((res) => {
      // console.log(res.data);
      if(res.data.status == "success"){
        dispatch(loginSuccess(res.data.userid));
      }else{
        dispatch(loginFailure());
      }
    }).catch((err) => {
      dispatch(loginFailure());
    })
  }
}

export function loginSuccess(userid) {
  return {
      type: types.AUTH_LOGIN_SUCCESS,
      userid
  };
}

export function loginFailure() {
  return {
      type: types.AUTH_LOGIN_FAILURE
  };
}