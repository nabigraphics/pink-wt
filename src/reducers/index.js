import { combineReducers } from 'redux';
import authentication from './authentication';
import files from './files';
const reducers = combineReducers({
    authentication, files
})
  
export default reducers;