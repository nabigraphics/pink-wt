import * as types from '../actions/ActionTypes';

const initialState = {
    logged:false,
    userid:"",
    loading:true
}

export default function (state = initialState, action){
  switch(action.type){
    case types.AUTH_LOGIN_SUCCESS:
        return {
            ...state,
            logged:true,
            userid:action.userid,
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