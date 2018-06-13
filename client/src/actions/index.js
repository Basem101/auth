import * as actions from './types';
import api from '../api';

// signup actoin creator
// action creators return a function that return an object
// we have access to store dispatch method because we use redux-thunk as a middleware
// we can use async await syntax to manage asyns requests managed by axios
// signup action creator will take in email, password, and a callback function as arguments
// the callback function is responsible for redirection the user after signing up.
// callback function will be invoked after dispatching AUTH_USER action

export const signup = (email, password, callback) => async dispatch => {
	// using APIs
	// handle errors useing try catch
	try {
		const response = await api.signup(email, password);
		dispatch({
			type: actions.AUTH_USER,
			payload: response.data.token
		});
		callback();
	} catch(e) {
		console.log("e: ", e);
		dispatch({
			type: actions.AUTH_ERROR,
			payload: 'Email in use'
		})
	}


	// axios
	// axios.post('http://localhost:3090/signup', {
	// 	email: email,
	// 	password: password
	// });
}
