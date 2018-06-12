import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/index';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';


ReactDom.render(
	<Provider store={createStore(reducers, {})}>
		<BrowserRouter>
			<App>
				<Route path="/" exact component={Welcome} />
				<Route path="/signup" exact component={Signup} />
			</App>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
