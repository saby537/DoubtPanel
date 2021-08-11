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
	const userReport = userData.report.userReport.map((data) => {
		let da = data.doubts.length,
			dr = 0,
			de = 0,
			adat = 0;
		data.doubts.forEach((el) => {
			if (el.status === 'resolved') {
				dr = dr + 1;
				adat += getDateDiff(el.acceptedDate, el.resolvedDate);
			}
			if (el.status === 'escalated') {
				de = de + 1;
				adat += getDateDiff(el.acceptedDate, el.escalatedDate);
			}
		});
		if (da > 0) {
			adat = Math.ceil(adat / da);
		}
		return { da, dr, de, adat, id: data.id, name: data.name };
	});
	let doubtData = userData.report.doubtReport;
	let doubtda = doubtData.length,
		doubtdr = 0,
		doubtde = 0,
		doubtadrt = 0;
	doubtData.forEach((el) => {
		if (el.status === 'resolved') {
			doubtdr = doubtdr + 1;
			doubtadrt += getDateDiff(el.raisedDate, el.resolvedDate);
		}
		if (el.status === 'escalated') {
			doubtde = doubtde + 1;
		}
	});
	if (doubtdr > 0) {
		doubtadrt = Math.ceil(doubtadrt / doubtdr);
	}
	return { userReport, doubtReport: { doubtda, doubtdr, doubtde, doubtadrt } };
};
