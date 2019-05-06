import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import homeReducer from '../container/HomeContainer/reducer';
import loginReducer from '../container/LoginContainer/reducer'


export default combineReducers({
	form: formReducer,
	homeReducer,
	loginReducer,
});
