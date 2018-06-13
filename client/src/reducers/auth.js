import * as actions from '../actions/types';
const INITIAL_STATE = {
	authenticated: '',
	errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		
		case actions.AUTH_USER:
			return {
				...state,
				authenticated: action.payload
			}
		
			default:
				return state;
	}	
}