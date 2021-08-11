import React, { useState } from 'react';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../utils/validator.js';
import Button from '../../components/FormElements/Button/Button';
import ErrorModal from '../../components/UIElements/ErrorModal/ErrorModal';
import Input from '../../components/FormElements/Input/Input';
import LoadingSpinner from '../../components/UIElements/LoadingSpinner/LoadingSpinner';
import { useForm } from '../../components/hooks/form-hook';

import { connect } from 'react-redux';
import {
	signUpStart,
	logInStart,
	emptyError,
} from '../../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectError, selectLoading } from '../../redux/user/user.selector';
import './Login.css';

const Login = ({ startLogIn, startSignUp, clearError, isLoading, error }) => {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);
	const authSubmitHandler = async (event) => {
		event.preventDefault();
		if (isLoginMode) {
			await startLogIn({
				email: formState.inputs.email.value,
				password: formState.inputs.password.value,
			});
		} else {
			await startSignUp({
				name: formState.inputs.name.value,
				email: formState.inputs.email.value,
				password: formState.inputs.password.value,
				role: formState.inputs.role.value,
			});
		}
	};
	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					role: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
					role: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};
	return (
		<React.Fragment>
			{error != null && <ErrorModal error={error} onClear={clearError} />}
			<div className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Login</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							element="input"
							type="text"
							id="name"
							label="Name"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a name!"
							onInput={inputHandler}
						/>
					)}
					{!isLoginMode && (
						<Input
							element="select"
							type="text"
							id="role"
							label="Role"
							validators={[VALIDATOR_REQUIRE()]}
							options={['Student', 'Teacher']}
							errorText="Please select valid Role!"
							onInput={inputHandler}
						/>
					)}
					<Input
						element="input"
						type="text"
						id="email"
						label="Email"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a valid Email!!"
						onInput={inputHandler}
					/>
					<Input
						element="input"
						type="password"
						id="password"
						label="Password"
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Please enter a password with minimum 6 characters!!"
						onInput={inputHandler}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? 'LOGIN' : 'SIGN UP'}
					</Button>
				</form>
				<Button type="submit" onClick={switchModeHandler} inverse>
					Switch to {!isLoginMode ? 'LOGIN' : 'SIGN UP'}
				</Button>
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startSignUp: (user) => dispatch(signUpStart(user)),
	startLogIn: (user) => dispatch(logInStart(user)),
	clearError: () => dispatch(emptyError()),
});
const mapStateToProps = createStructuredSelector({
	isLoading: selectLoading,
	error: selectError,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
