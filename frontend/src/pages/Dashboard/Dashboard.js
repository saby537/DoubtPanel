import React, { useEffect, Fragment, useState } from 'react';
import TAReportTile from '../../components/TAReportTile/TAReportTile';

import ErrorModal from '../../components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/UIElements/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { getReportStart, emptyError } from '../../redux/user/user.actions';
import {
	selectReport,
	selectError,
	selectLoading,
	selectUserId,
} from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import './Dashboard.css';

const Dashboard = ({
	getReport,
	clearError,
	isLoading,
	error,
	report,
	userId,
}) => {
	const [currentUserData, setCurrentUserData] = useState(null);
	useEffect(() => {
		getReport();
	}, [getReport]);

	useEffect(() => {
		setCurrentUserData(report.filter((el) => el.id === userId));
	}, [report, userId]);
	return (
		<Fragment>
			{error != null && <ErrorModal error={error} onClear={clearError} />}
			<div className="dashboard-container">
				{isLoading && <LoadingSpinner asOverlay />}
				<p className="page-header">Dashboard</p>
				{currentUserData && (
					<div className="cur-ta-stat-container">
						<div className="cur-ta-stat">
							<p className="cur-ta-stat-value">{currentUserData[0].da}</p>
							<p className="cur-ta-stat-label">Doubts Accepted</p>
						</div>
						<div className="cur-ta-stat">
							<p className="cur-ta-stat-value">{currentUserData[0].dr}</p>
							<p className="cur-ta-stat-label">Doubts Resolved</p>
						</div>
						<div className="cur-ta-stat">
							<p className="cur-ta-stat-value">{currentUserData[0].de}</p>
							<p className="cur-ta-stat-label">Doubts Escalated</p>
						</div>
						<div className="cur-ta-stat">
							<p className="cur-ta-stat-value">{currentUserData[0].adrt}</p>
							<p className="cur-ta-stat-label">Avg. Doubt Resolution Time</p>
						</div>
					</div>
				)}
				<div className="ta-report-container">
					<p className="page-content">TAs Report</p>
					{report.map((el) => (
						<TAReportTile
							key={el.id}
							da={el.da}
							dr={el.dr}
							de={el.de}
							adrt={el.adrt}
							name={el.name}
						/>
					))}
				</div>
			</div>
		</Fragment>
	);
};

const mapDispatchToProps = (dispatch) => ({
	getReport: () => dispatch(getReportStart()),
	clearError: () => dispatch(emptyError()),
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectLoading,
	error: selectError,
	report: selectReport,
	userId: selectUserId,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
