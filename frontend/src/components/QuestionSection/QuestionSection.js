import React from 'react';
import { getDateString } from '../../utils/dateFunctions';
import './QuestionSection.css';

const QuestionSection = ({
	title,
	content,
	user,
	date,
	status,
	answer,
	answeredBy,
	resolvedDate,
}) => {
	return (
		<div className="question-section">
			<div className="question-title-container">
				<p className="page-content-title">{title}</p>
				{status === 'resolved' && (
					<p className="question-resolved-label">Resolved</p>
				)}
			</div>
			<div className="question-content-container">
				<p className="page-content">{content}</p>
			</div>
			<div className="question-subtext-container">
				<p className="page-content-subtext">
					Asked by {user} on {getDateString(date)}
				</p>
			</div>
			{status === 'resolved' && (
				<React.Fragment>
					<div className="answer-content-container">
						<p className="page-content-bold">Answer: </p>
						<p className="page-content">{answer}</p>
					</div>
					<div className="answer-subtext-container">
						<p className="page-content-subtext">
							Answered by {answeredBy} on {getDateString(resolvedDate)}
						</p>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default QuestionSection;
