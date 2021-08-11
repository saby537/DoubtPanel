import userActionTypes from './user.types';
import { calculateReportValues } from './user.utils';
const INITIAL_STATE = {
	token: null,
	isLoading: false,
	error: null,
	userId: null,
	userRole: null,
	report: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userActionTypes.SIGN_UP_START:
		case userActionTypes.LOG_IN_START:
		case userActionTypes.GET_REPORT_START:
			return {
				...state,
				isLoading: true,
			};
		case userActionTypes.SIGN_UP_SUCCESS:
		case userActionTypes.LOG_IN_SUCCESS:
			return {
				...state,
				token: action.payload.token,
				userId: action.payload.userId,
				userRole: action.payload.userRole,
				isLoading: false,
				error: null,
			};
		case userActionTypes.GET_REPORT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				report: calculateReportValues(action.payload),
			};
		case userActionTypes.SIGN_UP_FAILURE:
		case userActionTypes.LOG_IN_FAILURE:
		case userActionTypes.GET_REPORT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case userActionTypes.EMPTY_ERROR:
			return {
				...state,
				error: null,
			};
		case userActionTypes.LOG_OUT:
			return {
				...state,
				token: null,
			};
		default:
			return state;
	}
};

export default userReducer;
