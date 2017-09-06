import * as types from './ActionTypes';
import axios from 'axios';

//LoadContent.

export function ContentsManager(type,file) {
  return (dispatch) => {
    switch(type) {
      case "add":
        let temp_file;
        return axios.get(`/contents/${file}`).then((res) => {
          temp_file = {
            filename:res.data.filename,
            filetype:res.data.file_type.split("/")[0],
            hash:res.data.hash,
            thumb:res.data.thumb,
            url:res.data.url
          }
          return dispatch(content_add(temp_file));
        }).catch((err) => { return })
      case "load":
        return dispatch(content_load(file));
      case "delete":
        return axios.delete(`/contents/${file}`).then((res) => {
          if(res.data.status == "success"){
            return dispatch(content_delete(res.data.hash));
          }
        }).catch((err) => { return });
    }
  }
}
export function content_add(file) {
  return {
    type:types.CONTENT_ADD,
    file
  }
}
export function content_load(file) {
  return {
    type:types.CONTENT_LOAD,
    file
  }
}
export function content_delete(file) {
  return {
    type:types.CONTENT_DELETE,
    file
  }
}
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