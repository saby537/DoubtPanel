import React, { useEffect } from 'react';
import DoubtDetailCard from '../../components/DoubtDetailCard/DoubtDetailCard';

import ErrorModal from '../../components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/UIElements/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { getAllDoubtStart, emptyError } from '../../redux/doubt/doubt.actions';
import {
	selectDoubtLoading,
	selectError,
	selectAllDoubts,
} from '../../redux/doubt/doubt.selector';
import { createStructuredSelector } from 'reselect';
import './HomePage.css';

const HomePage = ({
	getAllDoubts,
	clearError,
	isLoading,
	error,
	allDoubts,
}) => {
	useEffect(() => {
		getAllDoubts();
	}, [getAllDoubts]);
	return (
		<React.Fragment>
			{error != null && <ErrorModal error={error} onClear={clearError} />}
			<div className="homePage-container">
				{isLoading && <LoadingSpinner asOverlay />}
				<p className="page-header">Home</p>
				<p className="home-comment-count-label page-content">
					{allDoubts.length} {`${allDoubts.length > 1 ? 'Doubts' : 'Doubt'}`}
				</p>
				{allDoubts.map((el, i) => (
					<DoubtDetailCard
						key={el.id}
						title={el.title}
						content={el.description}
						raisedDate={el.raisedDate}
						comments={el.comments}
						status={el.status}
						user={el.student.name}
						id={el.id}
						answer={el.answer}
						answeredBy={`${el.teacher == null ? null : el.teacher.name}`}
						resolvedDate={el.resolvedDate}
					/>
				))}
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => ({
	getAllDoubts: (doubt) => dispatch(getAllDoubtStart(doubt)),
	clearError: () => dispatch(emptyError()),
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectDoubtLoading,
	error: selectError,
	allDoubts: selectAllDoubts,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
