import doubtActionTypes from './doubt.types';

export const addDoubtStart = (doubt) => ({
	type: doubtActionTypes.ADD_DOUBT_START,
	payload: doubt,
});
export const addDoubtSuccess = (data) => ({
	type: doubtActionTypes.ADD_DOUBT_SUCCESS,
	payload: data,
});
export const addDoubtFailure = (err) => ({
	type: doubtActionTypes.ADD_DOUBT_FAILURE,
	payload: err,
});

export const getRaisedDoubtStart = () => ({
	type: doubtActionTypes.GET_RAISED_DOUBT_START,
});
export const getRaisedDoubtSuccess = (data) => ({
	type: doubtActionTypes.GET_RAISED_DOUBT_SUCCESS,
	payload: data,
});
export const getRaisedDoubtFailure = (err) => ({
	type: doubtActionTypes.GET_RAISED_DOUBT_FAILURE,
	payload: err,
});

export const getDoubtStart = (id) => ({
	type: doubtActionTypes.GET_DOUBT_START,
	payload: id,
});
export const getDoubtSuccess = (data) => ({
	type: doubtActionTypes.GET_DOUBT_SUCCESS,
	payload: data,
});
export const getDoubtFailure = (err) => ({
	type: doubtActionTypes.GET_DOUBT_FAILURE,
	payload: err,
});

export const getAllDoubtStart = () => ({
	type: doubtActionTypes.GET_ALL_DOUBT_START,
});
export const getAllDoubtSuccess = (data) => ({
	type: doubtActionTypes.GET_ALL_DOUBT_SUCCESS,
	payload: data,
});
export const getAllDoubtFailure = (err) => ({
	type: doubtActionTypes.GET_ALL_DOUBT_FAILURE,
	payload: err,
});

export const addCommentStart = (comment) => ({
	type: doubtActionTypes.ADD_COMMENT_START,
	payload: comment,
});
export const addCommentSuccess = (data) => ({
	type: doubtActionTypes.ADD_COMMENT_SUCCESS,
	payload: data,
});
export const addCommentFailure = (err) => ({
	type: doubtActionTypes.ADD_COMMENT_FAILURE,
	payload: err,
});

export const addAnswerStart = (comment) => ({
	type: doubtActionTypes.ADD_ANSWER_START,
	payload: comment,
});
export const addAnswerSuccess = (data) => ({
	type: doubtActionTypes.ADD_ANSWER_SUCCESS,
	payload: data,
});
export const addAnswerFailure = (err) => ({
	type: doubtActionTypes.ADD_ANSWER_FAILURE,
	payload: err,
});

export const escalateDoubtStart = (data) => ({
	type: doubtActionTypes.ESCALATE_DOUBT_START,
	payload: data,
});
export const escalateDoubtSuccess = (data) => ({
	type: doubtActionTypes.ESCALATE_DOUBT_SUCCESS,
	payload: data,
});
export const escalateDoubtFailure = (err) => ({
	type: doubtActionTypes.ESCALATE_DOUBT_FAILURE,
	payload: err,
});

export const emptyError = () => ({
	type: doubtActionTypes.EMPTY_ERROR,
});
