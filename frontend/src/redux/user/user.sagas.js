import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	signUpSuccess,
	signUpFailure,
	logInSuccess,
	logInFailure,
	getReportFailure,
	getReportSuccess,
} from './user.actions';
import userActionTypes from './user.types';

export function* signUp({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		const res = yield fetch(
			`${process.env.REACT_APP_API_URL}/api/users/signup`,
			{
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json',
				},
				signal: httpAbortCtrl.signal,
			}
		);
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(signUpFailure(responseData.errors));
		} else {
			yield put(signUpSuccess(responseData));
		}
	} catch (err) {
		yield put(signUpFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onSignUp() {
	yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* logIn({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		const res = yield fetch(
			`${process.env.REACT_APP_API_URL}/api/users/login`,
			{
				method: 'POST',
				body: JSON.stringify(payload),
				headers: {
					'Content-Type': 'application/json',
				},
				signal: httpAbortCtrl.signal,
			}
		);
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(logInFailure(responseData.errors));
		} else {
			yield put(logInSuccess(responseData));
		}
	} catch (err) {
		console.log('error');
		yield put(logInFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onLogIn() {
	yield takeLatest(userActionTypes.LOG_IN_START, logIn);
}

export function* getReport() {
	const httpAbortCtrl = new AbortController();
	try {
		const res = yield fetch(`${process.env.REACT_APP_API_URL}/api/report`, {
			method: 'GET',
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(getReportFailure(responseData.errors));
		} else {
			yield put(getReportSuccess(responseData));
		}
	} catch (err) {
		console.log('error');
		yield put(getReportFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onGetReport() {
	yield takeLatest(userActionTypes.GET_REPORT_START, getReport);
}

export function* userSagas() {
	yield all([call(onSignUp), call(onLogIn), call(onGetReport)]);
}
