import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import userReducer from './user/user.reducer';
import doubtReducer from './doubt/doubt.reducer';
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	user: userReducer,
	doubt: doubtReducer,
});

export default persistReducer(persistConfig, rootReducer);
