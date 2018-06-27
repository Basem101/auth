// Header component.
// this component will hold all the links On home page
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import '../css/header.css';

class Header extends Component {

	renderLinks() {
		if(this.props.authenticated) {
			return (
				<div className="header">
					<Link to="/feature">Feature</Link>
					<br />
					<Link to="/signout">Sign Out</Link>
				</div>
			)
		} else {
			return (
				<div className="header">
					<Link to="/signup">Sign Up</Link>
					<br />
					<Link to="/signin">Sign In</Link>
				</div>
			)
		}
	}

	render() {
		return (
			<div className="header">
				<Link to="/">Redux Auth</Link>
				<br />
				{ this.renderLinks() }
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(Header);