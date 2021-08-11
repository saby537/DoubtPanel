import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router';
import DoubtCard from '../../components/DoubtCard/DoubtCard';
import ErrorModal from '../../components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/UIElements/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import {
	getRaisedDoubtStart,
	emptyError,
} from '../../redux/doubt/doubt.actions';
import {
	selectDoubtLoading,
	selectError,
	selectDoubtRaised,
} from '../../redux/doubt/doubt.selector';
import { createStructuredSelector } from 'reselect';
import './SolveDoubts.css';

const SolveDoubts = ({
	getRaisedDoubts,
	clearError,
	error,
	isLoading,
	raisedDoubts,
}) => {
	const hist = useHistory();
	useEffect(() => {
		getRaisedDoubts();
	}, [getRaisedDoubts]);

	const acceptHandler = (id) => {
		hist.push(`/answerDoubt/${id}`);
	};
	return (
		<Fragment>
			{error != null && <ErrorModal error={error} onClear={clearError} />}
			<div className="solveDoubts-container">
				{isLoading && <LoadingSpinner asOverlay />}

				<div className="page-header-container">
					<p className="page-header">Solve Doubts</p>
				</div>
				<div className="solveDoubts-content-container">
					{raisedDoubts != null &&
						raisedDoubts.map((el, i) => (
							<DoubtCard
								key={el.id}
								title={el.title}
								acceptHandler={acceptHandler}
								id={el.id}
							/>
						))}
				</div>
			</div>
		</Fragment>
	);
};

const mapDispatchToProps = (dispatch) => ({
	getRaisedDoubts: () => dispatch(getRaisedDoubtStart()),
	clearError: () => dispatch(emptyError()),
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectDoubtLoading,
	error: selectError,
	raisedDoubts: selectDoubtRaised,
});
export default connect(mapStateToProps, mapDispatchToProps)(SolveDoubts);
