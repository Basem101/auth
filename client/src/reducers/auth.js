import * as actions from '../actions/types';
const INITIAL_STATE = {
	authenticated: null,
	errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		
		case actions.AUTH_USER:
			return {
				...state,
				authenticated: action.payload
			}
		
		case actions.AUTH_ERROR:
			return {
				...state,
				errorMessage: action.payload
			}

		case actions.USER_SIGNOUT:
			return {
				...state,
				authenticated: null
			}

		default:
			return state;
	}
}