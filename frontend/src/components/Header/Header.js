import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/FormElements/Button/Button';
import { connect } from 'react-redux';
import { logOut } from '../../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUserRole } from '../../redux/user/user.selector';

import './Header.css';

const Header = ({ startLogout, token, userRole }) => {
	return (
		<header className="header">
			<ul className="nav-links">
				<li>
					<NavLink to="/home" exact>
						<img
							src="../../assets/Coding_Ninjas_logo.jpeg"
							alt="cn_logo"
							className="header-logo"
						/>
					</NavLink>
				</li>
				{token && (
					<Fragment>
						<li>
							<NavLink to="/home" exact>
								Home
							</NavLink>
						</li>
						|
					</Fragment>
				)}
				{token && userRole === 'student' && (
					<li>
						<NavLink to="/raiseDoubt" exact>
							Raise Doubt
						</NavLink>
					</li>
				)}
				{token && userRole === 'teacher' && (
					<Fragment>
						<li>
							<NavLink to="/solveDoubts" exact>
								Solve Doubts
							</NavLink>
						</li>
						|
						<li>
							<NavLink to="/dashboard" exact>
								Dashboard
							</NavLink>
						</li>
					</Fragment>
				)}
			</ul>
			{token && (
				<div className="header-btn-container">
					<Button type="submit" onClick={startLogout}>
						Log Out
					</Button>
				</div>
			)}
		</header>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startLogout: (user) => dispatch(logOut()),
});

const mapStateToProps = createStructuredSelector({
	token: selectToken,
	userRole: selectUserRole,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
