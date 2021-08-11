import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import LoadingSpinner from './components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUserRole } from './redux/user/user.selector';
import './App.css';
const SolveDoubts = lazy(() => import('./pages/SolveDoubts/SolveDoubts.js'));
const AnswerDoubts = lazy(() => import('./pages/AnswerDoubt/AnswerDoubt.js'));
const RaiseDoubt = lazy(() => import('./pages/RaiseDoubt/RaiseDoubt.js'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage.js'));
const Login = lazy(() => import('./pages/Login/Login.js'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.js'));

function App({ token, role }) {
	let LoggedInRoute = () => (
		<Switch>
			<Route exact path="/solveDoubts" component={SolveDoubts} />
			<Route exact path="/answerDoubt/:doubtId" component={AnswerDoubts} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/home" component={HomePage} />
			<Redirect to="/home" />
		</Switch>
	);
	if (token == null) {
		LoggedInRoute = () => (
			<Switch>
				<Route exact path="/login" component={Login} />
				<Redirect to="/login" />
			</Switch>
		);
	}
	if (token != null && role === 'student') {
		LoggedInRoute = () => (
			<Switch>
				<Route exact path="/raiseDoubt" component={RaiseDoubt} />
				<Route exact path="/home" component={HomePage} />
				<Redirect to="/home" />
			</Switch>
		);
	}
	return (
		<div className="App">
			<Header />
			<ErrorBoundary>
				<Suspense fallback={<LoadingSpinner asOverlay />}>
					<LoggedInRoute />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	token: selectToken,
	role: selectUserRole,
});
export default connect(mapStateToProps, null)(App);
