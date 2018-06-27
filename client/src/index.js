/**
 this is the root file for the application
 create redux store and add reduxThunk as a middleware
 pass in the created store to the Provider component and wrap the entire application. so we have access to redux state

 add redux dev tool ============ SHOULD BE REMOVED IN PRODUCTION ====================
 will check for 'token' in localStorage and load the value to our initialState "must match the same structure as the reducer"
 */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers/index';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';

const user = JSON.parse(localStorage.getItem('user'));

const store = createStore(
	reducers,
	{ 
		auth: { 
			authenticated: user && user.token ? user.token : '',
			email: user && user.email ? user.email : '',
			role: user && user.role ? user.role : ''
		}
	},
	composeWithDevTools(
		applyMiddleware(reduxThunk)
	)
)

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Route path="/" exact component={Welcome} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/feature" component={Feature} />
				<Route path="/signout" component={Signout} />
				<Route path="/signin" component={Signin} />
			</App>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
