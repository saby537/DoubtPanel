import React from 'react';
import './CommentCard.css';

const DoubtCard = ({ name, comment }) => {
	return (
		<div className="commentCard-container">
			<p className="page-content">{name}:</p>
			<p className="page-content" style={{ marginLeft: '2px' }}>
				{comment}
			</p>
		</div>
	);
};

export default DoubtCard;
