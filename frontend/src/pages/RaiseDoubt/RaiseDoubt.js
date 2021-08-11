import React, { useState } from 'react';
import Button from '../../components/FormElements/Button/Button';
import ErrorModal from '../../components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/UIElements/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { addDoubtStart, emptyError } from '../../redux/doubt/doubt.actions';
import {
	selectDoubtLoading,
	selectError,
} from '../../redux/doubt/doubt.selector';
import { selectToken } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import './RaiseDoubt.css';

const RaiseDoubt = ({
	startRaiseDoubt,
	isLoading,
	error,
	token,
	clearError,
}) => {
	const [input, setInput] = useState({ title: '', description: '' });
	const [valid, setValid] = useState({ title: false, description: false });

	const changeHandler = (e) => {
		setInput((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
		setValid((prev) => ({
			...prev,
			[e.target.id]: true,
		}));
	};

	const submitHandler = async () => {
		const { title, description } = input;
		const payload = {
			title,
			description,
			user: token,
		};
		await startRaiseDoubt(payload);
		setInput({ title: '', description: '' });
		setValid({ title: false, description: false });
	};
	return (
		<React.Fragment>
			{error != null && <ErrorModal error={error} onClear={clearError} />}
			<div className="raiseDoubt-container">
				{isLoading && <LoadingSpinner asOverlay />}
				<p className="page-header">Raise Doubt</p>
				<div className="doubt-section">
					<label className="page-content" style={{ fontWeight: 'bold' }}>
						Title
					</label>
					<input
						className="doubt-input"
						type="text"
						id="title"
						value={input.title}
						placeholder="Title"
						onChange={changeHandler}
					/>
					<label
						className="page-content"
						style={{ fontWeight: 'bold', marginTop: '15px' }}
					>
						Description
					</label>
					<textarea
						className="doubt-input"
						rows={3}
						type="text"
						id="description"
						value={input.description}
						placeholder="Description"
						onChange={changeHandler}
					/>
					<div className="doubt-btn-container">
						<Button
							type="submit"
							disabled={!valid.title || !valid.description}
							onClick={submitHandler}
						>
							Ask Doubt
						</Button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startRaiseDoubt: (doubt) => dispatch(addDoubtStart(doubt)),
	clearError: () => dispatch(emptyError()),
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectDoubtLoading,
	error: selectError,
	token: selectToken,
});
export default connect(mapStateToProps, mapDispatchToProps)(RaiseDoubt);

// How to do Ajax in Rails
// Hi, I want to submit a form in ruby on rails without reloading the page. How can I do the same? and are there any inbuilt helpers to assist with the same
