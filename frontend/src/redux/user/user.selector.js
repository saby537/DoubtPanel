import { createSelector } from 'reselect';

const selectUser = (state) => state.user;
export const selectToken = createSelector([selectUser], (user) => user.token);
export const selectError = createSelector([selectUser], (user) => user.error);
export const selectLoading = createSelector(
	[selectUser],
	(user) => user.isLoading
);
export const selectReport = createSelector([selectUser], (user) => user.report);
export const selectUserId = createSelector([selectUser], (user) => user.userId);
export const selectUserRole = createSelector(
	[selectUser],
	(user) => user.userRole
);
