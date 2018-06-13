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

// create redux store and add reduxThunk as a middleware
// pass in the created store to Provider component and wrap the entire application
// const store = createStore(
// 	reducers,
// 	{},
// 	applyMiddleware(reduxThunk),
// )
const store = createStore(
	reducers,
	{},
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
			</App>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
