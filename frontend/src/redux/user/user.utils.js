const getDateDiff = (d1, d2) => {
	var date1 = new Date(d1);
	var date2 = new Date();
	if (d2 != null) {
		date2 = new Date(d2);
	}
	var diffMs = date2 - date1;
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
	return diffMins;
};

export const calculateReportValues = (userData) => {
	return userData.map((data) => {
		let da = data.doubts.length,
			dr = 0,
			de = 0,
			adrt = 0;
		data.doubts.forEach((el) => {
			if (el.status === 'resolved') {
				dr = dr + 1;
				adrt += getDateDiff(el.acceptedDate, el.resolvedDate);
			}
			if (el.status === 'escalated') {
				de = de + 1;
				adrt += getDateDiff(el.acceptedDate, el.escalatedDate);
			}
			if (el.status === 'created') {
				adrt += getDateDiff(el.acceptedTime);
			}
		});
		if (da > 0) {
			adrt = Math.ceil(adrt / da);
		}
		return { da, dr, de, adrt, id: data.id, name: data.name };
	});
};
