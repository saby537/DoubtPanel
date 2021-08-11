import doubtActionTypes from './doubt.types';
import { pushComment } from './doubt.utils';
const INITIAL_STATE = {
	isLoading: false,
	error: null,
	success: null,
	raisedDoubt: [],
	answerDoubt: null,
	allDoubts: [],
};

const doubtReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case doubtActionTypes.ADD_DOUBT_START:
		case doubtActionTypes.ADD_COMMENT_START:
		case doubtActionTypes.ADD_ANSWER_START:
		case doubtActionTypes.GET_RAISED_DOUBT_START:
		case doubtActionTypes.GET_DOUBT_START:
		case doubtActionTypes.GET_ALL_DOUBT_START:
		case doubtActionTypes.ESCALATE_DOUBT_START:
			return {
				...state,
				isLoading: true,
				success: false,
			};
		case doubtActionTypes.ADD_DOUBT_SUCCESS:
		case doubtActionTypes.ADD_ANSWER_SUCCESS:
		case doubtActionTypes.ESCALATE_DOUBT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				success: true,
			};
		case doubtActionTypes.GET_RAISED_DOUBT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				success: true,
				raisedDoubt: action.payload,
			};
		case doubtActionTypes.GET_DOUBT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				success: true,
				answerDoubt: action.payload,
			};
		case doubtActionTypes.ADD_COMMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				success: true,
				allDoubts: pushComment(state.allDoubts, action.payload),
			};
		case doubtActionTypes.GET_ALL_DOUBT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				success: true,
				allDoubts: action.payload,
			};
		case doubtActionTypes.ADD_DOUBT_FAILURE:
		case doubtActionTypes.ADD_COMMENT_FAILURE:
		case doubtActionTypes.ADD_ANSWER_FAILURE:
		case doubtActionTypes.GET_RAISED_DOUBT_FAILURE:
		case doubtActionTypes.GET_DOUBT_FAILURE:
		case doubtActionTypes.GET_ALL_DOUBT_FAILURE:
		case doubtActionTypes.ESCALATE_DOUBT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
				success: false,
			};
		case doubtActionTypes.EMPTY_ERROR:
			return {
				...state,
				error: null,
				success: false,
			};
		default:
			return state;
	}
};

export default doubtReducer;
