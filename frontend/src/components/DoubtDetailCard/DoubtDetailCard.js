import React from 'react';
import QuestionSection from '../QuestionSection/QuestionSection';
import CommentSection from '../CommentSection/CommentSection';
import './DoubtDetailCard.css';

const DoubtDetailCard = ({
	title,
	content,
	user,
	raisedDate,
	status,
	comments,
	id,
	answer,
	answeredBy,
	resolvedDate,
}) => {
	return (
		<div className="doubtdetailcard-container">
			<QuestionSection
				title={title}
				content={content}
				user={user}
				date={raisedDate}
				status={status}
				answer={answer}
				answeredBy={answeredBy}
				resolvedDate={resolvedDate}
			/>
			<CommentSection comments={comments} doubtId={id} />
		</div>
	);
};

export default DoubtDetailCard;
