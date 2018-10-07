import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import quillModules from './editorModules';
import quilFormats from './editorFormats';

import 'react-quill/dist/quill.bubble.css';

class Editor extends React.Component {

  componentDidMount() {    
    // https://github.com/quilljs/quill/issues/109
    this.quill.editor.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
      const regex = /https?:\/\/[^\s]+/g;
      if(typeof(node.data) !== 'string') return;
      const matches = node.data.match(regex);
    
      if(matches && matches.length > 0) {
        const ops = [];
        let str = node.data;
        matches.forEach(function(match) {
          const split = str.split(match);
          const beforeLink = split.shift();
          ops.push({ insert: beforeLink });
          ops.push({ insert: match, attributes: { link: match } });
          str = split.join(match);
        });
        ops.push({ insert: str });
        delta.ops = ops;
      }    
      return delta;
    });
  };

  componentDidUpdate() {
    console.log(this.quill.editor.editor.delta.ops[0]);
  }

  state = { editorHtml: '', theme: 'bubble' };
  
  handleChange = html => 	this.setState({ editorHtml: html });
  
  render () {
    return (
        <ReactQuill
          ref={node => this.quill = node} 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={quillModules}
          formats={quilFormats}
          bounds={'.App'}
          placeholder={this.props.placeholder}
         />
     )
  }
}

Editor.propTypes = {
  placeholder: PropTypes.string,
}

export default Editor;