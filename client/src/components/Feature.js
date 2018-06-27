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
				<p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry 's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
				<AdminContentEditor />
			</div>
		)
	};
}

export default requireAuth(Feature);
