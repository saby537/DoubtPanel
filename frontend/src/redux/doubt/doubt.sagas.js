import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	addDoubtSuccess,
	addDoubtFailure,
	getRaisedDoubtFailure,
	getRaisedDoubtSuccess,
	getDoubtFailure,
	getDoubtSuccess,
	getAllDoubtSuccess,
	getAllDoubtFailure,
	addCommentFailure,
	addCommentSuccess,
	addAnswerFailure,
	addAnswerSuccess,
	escalateDoubtFailure,
	escalateDoubtSuccess,
} from './doubt.actions';
import doubtActionTypes from './doubt.types';

export function* addDoubt({ payload }) {
	const httpAbortCtrl = new AbortController();
	const { title, description, user } = payload;
	try {
		const res = yield fetch(`${process.env.REACT_APP_API_URL}/api/doubts`, {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user,
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(addDoubtFailure(responseData.errors));
		} else {
			yield put(addDoubtSuccess(responseData));
		}
	} catch (err) {
		yield put(addDoubtFailure([err]));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onAddDoubt() {
	yield takeLatest(doubtActionTypes.ADD_DOUBT_START, addDoubt);
}

export function* addComment({ payload }) {
	const httpAbortCtrl = new AbortController();
	const { message, doubtId, user } = payload;
	try {
		const res = yield fetch(`${process.env.REACT_APP_API_URL}/api/comments`, {
			method: 'POST',
			body: JSON.stringify({ message, doubtId }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + user,
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(addCommentFailure(responseData.errors));
		} else {
			yield put(addCommentSuccess({ ...responseData, doubtId }));
		}
	} catch (err) {
		yield put(addCommentFailure([err]));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onAddComment() {
	yield takeLatest(doubtActionTypes.ADD_COMMENT_START, addComment);
}

export function* addAnswer({ payload }) {
	const httpAbortCtrl = new AbortController();
	const { answer, doubtId, user } = payload;
	try {
		const res = yield fetch(
			`${process.env.REACT_APP_API_URL}/api/doubts/answer/${doubtId}`,
			{
				method: 'PATCH',
				body: JSON.stringify({ answer }),
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user,
				},
				signal: httpAbortCtrl.signal,
			}
		);
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(addAnswerFailure(responseData.errors));
		} else {
			yield put(addAnswerSuccess(responseData));
		}
	} catch (err) {
		yield put(addAnswerFailure([err]));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onAddAnswer() {
	yield takeLatest(doubtActionTypes.ADD_ANSWER_START, addAnswer);
}

export function* escalateDoubt({ payload }) {
	const httpAbortCtrl = new AbortController();
	const { doubtId, user } = payload;
	try {
		const res = yield fetch(
			`${process.env.REACT_APP_API_URL}/api/doubts/escalate/${doubtId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user,
				},
				signal: httpAbortCtrl.signal,
			}
		);
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(escalateDoubtFailure(responseData.errors));
		} else {
			yield put(escalateDoubtSuccess(responseData));
		}
	} catch (err) {
		yield put(escalateDoubtFailure([err]));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onEscalateDoubt() {
	yield takeLatest(doubtActionTypes.ESCALATE_DOUBT_START, escalateDoubt);
}

export function* getRaisedDoubts() {
	const httpAbortCtrl = new AbortController();
	try {
		const res = yield fetch(
			`${process.env.REACT_APP_API_URL}/api/doubts/created`,
			{
				method: 'GET',
				signal: httpAbortCtrl.signal,
			}
		);
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(getRaisedDoubtFailure(responseData.errors));
		} else {
			yield put(getRaisedDoubtSuccess(responseData));
		}
	} catch (err) {
		yield put(getRaisedDoubtFailure([err]));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onGetRaisedDoubts() {
	yield takeLatest(doubtActionTypes.GET_RAISED_DOUBT_START, getRaisedDoubts);
}

export function* getDoubt({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		const res = yield fetch(
			`${process.env.REACT_APP_API_URL}/api/doubts/accept/${payload.id}`,
			{
				method: 'PATCH',
				signal: httpAbortCtrl.signal,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + payload.user,
				},
			}
		);
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(getDoubtFailure(responseData.errors));
		} else {
			yield put(getDoubtSuccess(responseData));
		}
	} catch (err) {
		yield put(getDoubtFailure([err]));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onGetDoubt() {
	yield takeLatest(doubtActionTypes.GET_DOUBT_START, getDoubt);
}

export function* getAllDoubts() {
	const httpAbortCtrl = new AbortController();
	try {
		const res = yield fetch(`${process.env.REACT_APP_API_URL}/api/doubts`, {
			method: 'GET',
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(getAllDoubtFailure(responseData.errors));
		} else {
			yield put(getAllDoubtSuccess(responseData));
		}
	} catch (err) {
		yield put(getAllDoubtFailure([err]));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onGetAllDoubt() {
	yield takeLatest(doubtActionTypes.GET_ALL_DOUBT_START, getAllDoubts);
}

export function* doubtSagas() {
	yield all([
		call(onAddDoubt),
		call(onGetRaisedDoubts),
		call(onGetDoubt),
		call(onGetAllDoubt),
		call(onAddComment),
		call(onAddAnswer),
		call(onEscalateDoubt),
	]);
}
