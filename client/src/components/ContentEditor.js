/*
this component is the contentEditor for Admin/Editor roles to edit/update page contents
for the demo.we will use draft-js platform built by facebook https: //draftjs.org/
to make things easy for the demo. will store data to localStorage. 
- initial state for editor is empty
- look for editorObject in localStorage
if user's role is viewer-just render a plain text.
if user's role id admin or editor - render editorState
*/

import React, { Component } from 'react';
import {
	Editor,
	EditorState,
	RichUtils,
	convertFromRaw,
	convertToRaw,
	ContentState,
	EditorContent
} from 'draft-js';
import '../css/editor.css';

class ContentEditor extends Component {
  constructor(props) {
		super(props);

		let initialEditorState = null;
		const storeRaw = localStorage.getItem('draftRaw');

		if (storeRaw) {
			const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
			initialEditorState = EditorState.createWithContent(rawContentFromStore);
		} else {
			initialEditorState = EditorState.createEmpty();
		}

		this.state = {
			editorState: initialEditorState
		};

		this.onChange = this.onChange.bind(this);
		this.saveContent = this.saveContent.bind(this);
	}

	onChange = (editorState, e) => {
		console.log('change: ', editorState);
		this.setState({
			editorState
		});
	}

	saveContent() {
		const contentRaw = convertToRaw(this.state.editorState.getCurrentContent());
		localStorage.setItem('draftRaw', JSON.stringify(contentRaw));
		// let plainText = ContentState.getPlainText();
		// localStorage.setItem('plainText', ContentState.getPlainText)
	}

	render() {
		return (
			<div>
				<h3>Only admin can edit content</h3>
				<Editor 
					editorState={this.state.editorState}
					onChange={this.onChange}
				/>
			<button onClick={this.saveContent}>save</button>
			</div>
		)
	}
}

export default ContentEditor;