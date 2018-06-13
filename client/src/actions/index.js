import axios from 'axios';
import { AUTH_USER } from './types';
import api from '../api';

// signup actoin creator
// action creators return a function that return an object
// we have access to store dispatch method because we use redux-thunk as a middleware
// we can use async await syntax to manage asyns requests managed by axios
// es6 action creator syntax
// export const signup = ({email, password}) => dispatch => {
// 	dispatch({
// 		type: AUTH_USER
// 	});
// };

export const signup = (email, password) => async dispatch => {
	// using APIs file
	const response = await api.signup(email, password);
	dispatch({
		type: AUTH_USER,
		payload: response.data.token
	});
	// axios
	// axios.post('http://localhost:3090/signup', {
	// 	email: email,
	// 	password: password
	// });
}
