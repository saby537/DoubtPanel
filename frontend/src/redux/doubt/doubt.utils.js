export const pushComment = (allDoubts, comment) => {
	const { commentTime, message, id } = comment.data;
	return allDoubts.map((doubt) => {
		if (doubt.id === comment.doubtId) {
			doubt.comments.push({
				commentTime,
				message,
				id,
				user: comment.user,
			});
		}
		return doubt;
	});
};
