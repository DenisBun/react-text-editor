import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import quillModules from './editorModules';
import quilFormats from './editorFormats';

import 'react-quill/dist/quill.bubble.css';

class Editor extends React.Component {

  state = { editorHtml: '', theme: 'bubble' };
  
  handleChange = html => 	this.setState({ editorHtml: html });
  
  handleThemeChange = newTheme => {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme })
  };
  
  render () {
    return (
        <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={quillModules}
          formats={quilFormats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         />
     )
  }
}

Editor.propTypes = {
  placeholder: PropTypes.string,
}

export default Editor;