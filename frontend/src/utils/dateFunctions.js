export const getDateString = (date) => {
	const dt = new Date(date);
	const month = dt.toDateString().split(' ')[1];
	const day = dt.toDateString().split(' ')[2];
	const time = dt.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');
	return month + ' ' + day + ' ' + time;
};
