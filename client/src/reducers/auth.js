import * as actions from '../actions/types';
const INITIAL_STATE = {
	email: '',
	authenticated: null,
	role: '',
	errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		case actions.AUTH_USER:
			return {
				...state,
				authenticated: action.payload.token,
				role: action.payload.role,
				email: action.payload.email,
				errorMessage: ''
			}

		case actions.AUTH_ERROR:
			return {
				...state,
				errorMessage: action.payload
			}

		case actions.USER_SIGNOUT:
			return {
				...state,
				authenticated: null,
				role: '',
				email: ''
			}

		default:
			return state;
	}
}