/*
 this is a protected resource. Users shoun't be able to see this component if they are not logged in
 to implement thgis feature. we will be using requireAuth higher order component that chceks
 redux state authenticated property.
*/
import React, { Component } from 'react';
import requireAuth from './requireAuth';
import requireAdmin from './requireAdmin';
import ContentEditor from './ContentEditor';

class Feature extends Component {
	render() {
		const AdminContentEditor = requireAdmin(ContentEditor);
		return (
			<div>
				<h2>Feature Page</h2>
				<AdminContentEditor />
			</div>
		)
	};
}

export default requireAuth(Feature);