// Header component.
// this component will hold all the links On home page
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
	render() {
		return (
			<div>
				<Link to="/">Redux Auth</Link>
				<br />
				<Link to="/signup">Sign Up</Link>
				<br />
				<Link to="/signin">Sign In</Link>
				<br />
				<Link to="/signout">Sign Out</Link>
				<br />
				<Link to="/feature">Feature</Link>
			</div>
		);
	}
}

export default Header;