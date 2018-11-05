import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import quillModules from './editorModules';
import quilFormats from './editorFormats';

import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

class Editor extends Component {
  static propTypes = {
    headline: PropTypes.string,
  };

  static defaultProps = {
    headline: '<h1>Default headline<h1>',
  };

  state = {
    editorHtml: this.props.headline,
    theme: 'bubble',
    sideMenuButtonStyle: {
      //display: 'none',
      position: 'absolute',
      left: 15,
      top: 100,
    },
  };

  // method for handling side toolbar
  // it adds the additional class name
  // and show the toolbar
  handleSideButtonClick = () => {
    document.querySelector('.ql-toolbar').classList.add('sideMenu');
    this.quill.editor.theme.tooltip.edit();
    this.quill.editor.theme.tooltip.show();
  };

  handleChange = html => this.setState({ editorHtml: html });

  handleAdditionalMenu = () => {
    // https://stackoverflow.com/a/3545073
    const selection = window.getSelection
      ? window.getSelection()
      : document.selection.createRange();

    const toolbarClassList = document.querySelector('.ql-toolbar').classList;

    // if no text selected and side menu toolbar applied -> reset it to the main toolbar
    if (selection.type === 'Caret' && toolbarClassList.contains('sideMenu')) {
      toolbarClassList.remove('sideMenu');
    }
    // if (selection.type === 'Caret' && this.state.theme === 'snow') {
    //   this.setState({ theme: 'bubble' });
    // }

    // side toolbar is only applied by clicking on a button,
    // so if text selected and side toolbar applied -> reset it to the main toolbar and show it
    if (selection.type === 'Range' && toolbarClassList.contains('sideMenu')) {
      toolbarClassList.remove('sideMenu');
      this.quill.editor.theme.tooltip.show();
    }
  };

  handleThemeChange = e => {
    console.log(e.path, e.path[3], e.relatedTarget);
    console.log(e.path[3].className === 'ql-container ql-bubble');
    setTimeout(() => {
      e.path.filter(el => el.className === 'ql-container ql-bubble') &&
        this.setState({ theme: 'snow' });
    }, 1000);
  };

  handeSideButtonPosition = e => {
    console.log(e.pageX, e.pageY);
    // if (this.state.sideMenuButtonStyle.top - e.pageY < 10)
    // this.setState({
    //   sideMenuButtonStyle: {
    //     ...this.state.sideMenuButtonStyle,
    //     display: 'block',
    //     top: e.pageY,
    //   },
    // });
  };

  componentDidMount() {
    document
      .querySelector('.App')
      .addEventListener('mouseup', this.handleAdditionalMenu);
    document
      .querySelector('.quill')
      .addEventListener('mouseup', this.handeSideButtonPosition);

    // https://github.com/quilljs/quill/issues/109
    this.quill.editor.clipboard.addMatcher(Node.TEXT_NODE, function(
      node,
      delta
    ) {
      const regex = /https?:\/\/[^\s]+/g;
      if (typeof node.data !== 'string') return;
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
  }

  componentDidUpdate() {
    // dynamically change theme for links
    document
      .querySelectorAll('.ql-editor a')
      .forEach(a => a.addEventListener('mouseover', this.handleThemeChange));
    this.state.theme === 'snow' &&
      document
        .querySelector('.ql-snow .ql-tooltip')
        .addEventListener('mouseleave', () => {
          if (this.state.theme !== 'bubble') this.setState({ theme: 'bubble' });
        });
  }

  componentWillUnmount() {
    document
      .querySelector('.App')
      .removeEventListener('mouseup', this.handleAdditionalMenu);
    // document
    //   .querySelector('.quill')
    //   .removeEventListener('click', this.handeSideButtonPosition);
  }

  render() {
    const { theme, editorHtml } = this.state;
    return (
      <Fragment>
        <ReactQuill
          ref={node => (this.quill = node)}
          theme={theme}
          onChange={this.handleChange}
          value={editorHtml}
          modules={quillModules}
          formats={quilFormats}
          bounds={'.App'}
        />
        <button
          className="sideMenuButton"
          style={this.state.sideMenuButtonStyle}
          ref={node => (this.additionalMenu = node)}
          onClick={this.handleSideButtonClick}
        >
          +
        </button>
      </Fragment>
    );
  }
}

export default Editor;
