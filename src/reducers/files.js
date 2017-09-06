import * as types from '../actions/ActionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  content:List()
})

export default function (state = initialState, action){
  const content = state.get('content');
  switch(action.type){
    case types.CONTENT_LOAD:
      return state.set("content",List(action.file));
    case types.CONTENT_ADD:
      return state.set("content",content.unshift(action.file));
    case types.CONTENT_DELETE:
      return state.set('content',content.delete(content.findIndex(item => {return item.hash === action.file})));
    default :
      return state;
  }
}