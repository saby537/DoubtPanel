import { createSelector } from 'reselect';

const selectDoubt = (state) => state.doubt;

export const selectError = createSelector(
	[selectDoubt],
	(doubt) => doubt.error
);

export const selectDoubtLoading = createSelector(
	[selectDoubt],
	(road) => road.isLoading
);
export const selectDoubtRaised = createSelector(
	[selectDoubt],
	(doubt) => doubt.raisedDoubt
);

export const selectDoubtAnswered = createSelector(
	[selectDoubt],
	(doubt) => doubt.answerDoubt
);

export const selectAllDoubts = createSelector(
	[selectDoubt],
	(doubt) => doubt.allDoubts
);
