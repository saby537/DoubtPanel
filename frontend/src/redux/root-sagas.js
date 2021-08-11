import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { doubtSagas } from './doubt/doubt.sagas';
export default function* rootSaga() {
	yield all([call(userSagas), call(doubtSagas)]);
}
