import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionSection from '../../components/QuestionSection/QuestionSection';
import CommentSection from '../../components/CommentSection/CommentSection';
import Button from '../../components/FormElements/Button/Button';
import ErrorModal from '../../components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/UIElements/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import {
	getDoubtStart,
	addAnswerStart,
	emptyError,
	escalateDoubtStart,
} from '../../redux/doubt/doubt.actions';
import {
	selectDoubtLoading,
	selectError,
	selectDoubtAnswered,
} from '../../redux/doubt/doubt.selector';
import { selectToken } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import './AnswerDoubt.css';

const AnswerDoubt = ({
	getRaisedDoubt,
	answerDoubt,
	error,
	isLoading,
	clearError,
	addAnswer,
	token,
	escalateDoubt,
}) => {
	const id = useParams().doubtId;
	const [answer, setAnswer] = useState();
	const changeHandler = (e) => {
		setAnswer(e.target.value);
	};
	const answerHandler = async () => {
		await addAnswer({ answer, user: token, doubtId: id });
	};
	const escalateHandler = async () => {
		await escalateDoubt({ user: token, doubtId: id });
	};
	useEffect(() => {
		getRaisedDoubt({ id, user: token });
	}, [id, getRaisedDoubt, token]);
	return (
		<Fragment>
			{error != null && <ErrorModal error={error} onClear={clearError} />}
			<div className="answerDoubts-container">
				{isLoading && <LoadingSpinner asOverlay />}
				<p className="page-header">Solve Doubts</p>
				<div className="answerDoubts-form-container">
					<div className="question-detail-container">
						{answerDoubt != null && (
							<Fragment>
								<QuestionSection
									title={answerDoubt.title}
									content={answerDoubt.description}
									user={answerDoubt.student.name}
									date={answerDoubt.raisedDate}
								/>
								<CommentSection
									comments={answerDoubt.comments}
									disabled={true}
								/>
							</Fragment>
						)}
					</div>
					<div className="answer-detail-container">
						<div className="answer-section">
							<label className="page-content" style={{ fontWeight: 'bold' }}>
								Answer
							</label>
							<textarea
								className="answer-input"
								rows={3}
								type="text"
								id="answer"
								placeholder="Answer"
								onChange={changeHandler}
							/>
							<div className="answer-btn-container">
								<Button type="submit" onClick={answerHandler}>
									Answer
								</Button>
							</div>
						</div>
						<div className="escalate-btn-container">
							<Button type="submit" onClick={escalateHandler} inverse>
								Escalate
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

const mapDispatchToProps = (dispatch) => ({
	getRaisedDoubt: (data) => dispatch(getDoubtStart(data)),
	addAnswer: (answer) => dispatch(addAnswerStart(answer)),
	escalateDoubt: (data) => dispatch(escalateDoubtStart(data)),
	clearError: () => dispatch(emptyError()),
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectDoubtLoading,
	error: selectError,
	answerDoubt: selectDoubtAnswered,
	token: selectToken,
});
export default connect(mapStateToProps, mapDispatchToProps)(AnswerDoubt);
