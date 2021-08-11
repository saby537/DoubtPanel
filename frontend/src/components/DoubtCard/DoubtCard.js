import React from 'react';
import Button from '../FormElements/Button/Button';
import './DoubtCard.css';

const DoubtCard = ({ title, acceptHandler, id }) => {
	return (
		<div className="doubtCard-container">
			<div className="doubtCard-content-container">
				<p className="page-content-title">{title}</p>
			</div>
			<div className="doubtCard-btn-container">
				<Button inverse onClick={() => acceptHandler(id)}>
					Accept
				</Button>
			</div>
		</div>
	);
};

export default DoubtCard;
