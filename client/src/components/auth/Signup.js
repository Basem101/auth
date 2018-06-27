// signup form component
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Signup extends Component {

	// don't need to bind arrow function
	onSubmit = (formProps) => { // formProps is provided to us by reduxForm
		const { email, password, role } = formProps;
		this.props.signup(email, password, role, () => {
			// redirection callback. 
			// must add a the callback as a second parameter to signup action creator.
			// invoke the callback after dispatching AUTH_USER action.
			// check signup action creator
			this.props.history.push('/feature');
		});
	};

	render() {

		const {handleSubmit, errorMessage} = this.props;
		console.log('error: ', errorMessage)
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<fieldset>
					<label>Email: </label>
					<Field 
						name="email"
						type="text"
						component="input"
						autoComplete="none"
					/>
				</fieldset>
				<fieldset>
					<label>Password: </label>
					<Field
						name="password"
						type="password"
						component="input"
						autoComplete="none"
					/>
				</fieldset>
				<fieldset>
					<label>Role: </label>
					<Field
						name="role"
						type="role"
						component="input"
						autoComplete="none"
					/>
				</fieldset>
				<div>{errorMessage}</div>
				<button>Signup</button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage
	}
}


// compose helper method from redux allows us to apply multiple higher order components to a single component with an easy to read syntax
export default compose(
	connect(mapStateToProps, actions),
	reduxForm({form: 'signup'})
)(Signup);
