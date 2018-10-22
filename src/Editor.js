import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import quillModules from './editorModules';
import quilFormats from './editorFormats';

import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

class Editor extends React.Component {

  static propTypes = {
    headline: PropTypes.string,
  };

  static defaultProps = {
    headline: '<h1>Default headline<h1>'
  };

  state = { 
    editorHtml: this.props.headline,
    theme: 'bubble',
    isSideMenu: false,
  };

  handleFocus = () => {
    this.setState({ isSideMenu: true }, () => {
      this.quill.editor.theme.tooltip.edit();
      this.quill.editor.theme.tooltip.show();
    });    
  };

  handleChange = html => 	this.setState({ editorHtml: html });

  handleAdditionalMenu = () => {
    // https://stackoverflow.com/a/3545073
    const selection = window.getSelection ? window.getSelection() : document.selection.createRange();
    selection.toString() !== '' && this.state.isSideMenu === true && this.setState({ isSideMenu: false }, () => this.quill.editor.theme.tooltip.show());
    
    console.log(this.state.isSideMenu);

    // const cursorBounds = this.quill.editor.getBounds(this.quill.editor.getSelection() ? this.quill.editor.getSelection().index : 1);
    // console.log(cursorBounds);
    // this.additionalMenu.style = {
    //   position: 'absolute',
    //   color: 'blue',
    //   ...cursorBounds
    // }
  };

  componentDidMount() {
   // document.querySelector(".ql-editor").addEventListener("mouseup", this.handleAdditionalMenu);
    document.body.addEventListener('mouseup', this.handleAdditionalMenu);

    // https://github.com/quilljs/quill/issues/109
    this.quill.editor.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
      const regex = /https?:\/\/[^\s]+/g;
      if (typeof(node.data) !== 'string') return;
      const matches = node.data.match(regex);
      if (matches && matches.length > 0) {
        const ops = [];
        let str = node.data;
        matches.forEach(match => {
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
    // document.querySelectorAll('a').forEach(a => a.addEventListener('mouseover', () => this.setState({theme: 'snow'})));
    // document.querySelectorAll('.ql-editor').forEach(a => a.addEventListener('keypress', () => {
    //     if(this.state.theme!=='bubble') this.setState({theme: 'bubble'})
    // }));
  };

  componentWillUnmount() {
    document.body.removeEventListener('mouseup',this.handleAdditionalMenu);
  };   
  
  render () {
    const { isSideMenu, theme, editorHtml } = this.state;
    return (
      <Fragment>
        <ReactQuill
          ref={node => this.quill = node} 
          theme={theme}
          onChange={this.handleChange}
          value={editorHtml}
          modules={quillModules(isSideMenu)}
          formats={quilFormats}
          bounds={'.App'}
        />
        <button
          style={{color: 'red'}} 
          ref={node => this.additionalMenu = node}
          onClick={this.handleFocus}
        >
          test
        </button>
      </Fragment>
     )
  }
}

export default Editor;