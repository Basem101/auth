/* 
 this is a higher order component that return a function instead of a regular react component;
 this function will check redux state authenticated property (where we store the token)
 if the user is not logged in, (authenticated propery is empty). will push the user to home page '/'
 if user is logged in, will render the ChildComponent
 should be used to wrap all protedted resources - routes
 Ex: export default requireAuth(componentName)
 check Feature component
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

export default (ChildComponent) => {
	class ComposedComponent extends Component {
		// Our component just got rendered
		componentDidMount() {
			this.shouldNavigateAway();
		}
		// Our component just got updated
		componentDidUpdate() {
			this.shouldNavigateAway();
		}
		shouldNavigateAway() {
			if (!this.props.auth) {
				this.props.history.push('/');
			}
		}
		render() {
			return <ChildComponent { ...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {
			auth: state.auth.authenticated
		};
	}
	return connect(mapStateToProps)(ComposedComponent);
};