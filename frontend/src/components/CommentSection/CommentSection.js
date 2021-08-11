import React, { useState } from 'react';
import CommentCard from '../CommentCard/CommentCard';
import Button from '../FormElements/Button/Button';

import { connect } from 'react-redux';
import { addCommentStart, emptyError } from '../../redux/doubt/doubt.actions';
import {
	selectDoubtLoading,
	selectError,
} from '../../redux/doubt/doubt.selector';
import { selectToken } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import './CommentSection.css';

const CommentSection = ({ comments, disabled, addComment, doubtId, token }) => {
	const [comment, setComment] = useState('');
	const changeHandler = (e) => {
		setComment(e.target.value);
	};
	const addCommentHandler = async () => {
		await addComment({ message: comment, doubtId, user: token });
		setComment('');
	};
	return (
		<div className="comment-section">
			<p className="page-content">
				{comments.length} {`${comments.length > 1 ? 'comments' : 'comment'}`}
			</p>
			<div className="comment-container">
				{comments.map((com, i) => (
					<CommentCard name={com.user.name} key={i} comment={com.message} />
				))}
			</div>
			{!disabled && (
				<div className="comment-input-container">
					<input
						className="comment-input"
						rows={3}
						type="text"
						id={`comment-input-${doubtId}`}
						placeholder="Add Comment"
						onChange={changeHandler}
						value={comment}
					/>
					<Button type="submit" onClick={addCommentHandler} inverse>
						Comment
					</Button>
				</div>
			)}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addComment: (comment) => dispatch(addCommentStart(comment)),
	clearError: () => dispatch(emptyError()),
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectDoubtLoading,
	error: selectError,
	token: selectToken,
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
