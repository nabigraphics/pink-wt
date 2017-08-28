import * as types from '../actions/ActionTypes';

const initialState = {
    logged:false,
    username:"",
    user_profile:"",
    loading:true
}

export default function (state = initialState, action){
  switch(action.type){
    case types.AUTH_LOGIN_SUCCESS:
        return {
            ...state,
            logged:true,
            username:action.username,
            user_profile:action.user_profile,
            loading:false
        }
    case types.AUTH_LOGIN_FAILURE:
        return{
            logged:false,
            loading:false
        }
    default :
      return state;
  }
}