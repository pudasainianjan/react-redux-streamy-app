//all reducers
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

//*redux-form library to manage our form data inside the store
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});