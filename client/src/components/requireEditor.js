/* 
 this is a higher order component that return a function instead of a regular react component;
 this function will check redux state role property
 if the user is not "admin" or "Editor". they should not be able to see this component 
*/

import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';

export default (ChildComponent) => {
	class ComposedComponent extends Component {

		componentDidMount() {
			console.log('role: ', this.props.role);
		}

		render() {
			if (this.props.role === 'editor' || this.props.role === 'admin') {
				return <ChildComponent { ...this.props } />;
			} else {
				return  null;
			}
		}
	}

	function mapStateToProps(state) {
		return {
			role: state.auth.role
		};
	}
	return connect(mapStateToProps)(ComposedComponent);
};