/*
 this is a protected resource. Users shoun't be able to see this component if they are not logged in
 to implement thgis feature. we will be using requireAuth higher order component that chceks
 redux state authenticated property.
*/
import React, { Component } from 'react';
import requireAuth from './requireAuth';
import requireAdmin from './requireAdmin';
import ContentEditor from './ContentEditor';
import DraftExporter from 'draft-js-exporter';
import { connect } from 'react-redux';

class Feature extends Component {

	
	createMarkup() {
		const editorState = JSON.parse(localStorage.getItem('draftRaw'));
		const exporter = new DraftExporter(editorState);
		const content = exporter.export();
		return {
			__html: content
		};
	}
	render() {

		const AdminContentEditor = requireAdmin(ContentEditor);
		console.log(AdminContentEditor)
		return (
			<div>
				<h2>Feature Page</h2>
				{
					this.props.role === 'guest' 
					? <div dangerouslySetInnerHTML={ this.createMarkup() } />
					: <AdminContentEditor />
				}
				
			</div>
		)
	};
}

const mapStateToProps = (state) => {
	return {
		role: state.auth.role
	}
}


export default connect(mapStateToProps)(requireAuth(Feature));
