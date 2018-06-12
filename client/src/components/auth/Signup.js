// signup form component
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';

import signup from '../../actions/index';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Signup extends Component {

	// don't need to bind arrow function
	onSubmit = (formProps) => { // formProps is provided to us by reduxForm
		const { email, password } = formProps;
		this.props.signup(email, password);
	};

	render() {

		const {handleSubmit} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<fieldset>
					<label>Email</label>
					<Field 
						name="email"
						type="text"
						component="input"
						autoComplete="none"
					/>
				</fieldset>
				<fieldset>
					<label>Password</label>
					<Field
						name="password"
						type="password"
						component="input"
						autoComplete="none"
					/>
				</fieldset>
				<button>Signup</button>
			</form>
		);
	}
}

// compose helper method from redux allows us to apply multiple higher order components to a single component with an easy to read syntax
export default compose(
	connect(null, actions),
	reduxForm({form: 'signup'})
)(Signup);
