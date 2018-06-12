import axios from 'axios';

export default {
	signup(email, password) {
		console.log('params: ', email, password);
		return axios.post(
			'http://localhost:3090/signup', 
			{
				email:email,
				password:password
			}
		);
	}
}
