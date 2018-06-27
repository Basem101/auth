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
		this.state = { editorState: EditorState.createEmpty() };
		this.onChange = this.onChange.bind(this);
		this.saveContent = this.saveContent.bind(this);
	}

	onChange = (editorState, e) => {
		console.log('change: ', editorState);
		this.setState({
			editorState
		});
	}

	handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	_onBoldClick() {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
	}

	saveContent() {
		// the raw state, stringified
		console.dir(this.state.editorState.getPlainText())
		const rawDraftContentState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
		// convert the raw state back to a useable ContentState object
		console.log('row data', rawDraftContentState);
		const contentState = convertFromRaw(JSON.parse(rawDraftContentState));
		console.log('content state: ', contentState);
	}

	render() {
		return (
			<div>
				<h3>Only admin can edit content</h3>
				<button onClick={this._onBoldClick.bind(this)}>Bold</button>
				<Editor 
					editorState={this.state.editorState}
					onChange={this.onChange}
					handleKeyCommand={this.handleKeyCommand}
				/>
			<button onClick={this.saveContent}>save</button>
			</div>
		)
	}
}

export default ContentEditor;