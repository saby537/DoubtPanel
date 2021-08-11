import React from 'react';
import './TAReportTile.css';

const TAReportTile = ({ da, dr, de, adat, name }) => {
	return (
		<div className="ta-tile-container">
			<p className="page-content">{name}</p>
			<p className="page-content">
				Doubt Accepted: {da} | Doubt Resolved: {dr} | Doubt Escalated: {de} |
				Avg. Doubt Activity Time: {adat}
			</p>
		</div>
	);
};

export default TAReportTile;
