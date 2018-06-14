// Signin component -- a copy of signup.js
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Signin extends Component {

	componentDidMount() {
		console.log('load signin component')
	}

	onSubmit = (formProps) => { // formProps is provided to us by reduxForm
		const { email, password } = formProps;
		this.props.signin(email, password, () => {
			this.props.history.push('/feature');
		});
	};

	render() {

		const {handleSubmit, errorMessage} = this.props;
		console.log('error: ', errorMessage)
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
				<div>{errorMessage}</div>
				<button>Signin</button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage
	}
}

export default compose(
	connect(mapStateToProps, actions),
	reduxForm({form: 'signin'})
)(Signin);
