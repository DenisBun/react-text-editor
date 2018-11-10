import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import quillModules from './editorModules';
import quilFormats from './editorFormats';
import { LinkPopup } from './utils/LinkPopup';

import 'react-quill/dist/quill.bubble.css';
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
    showLinkPopup: false,
    targetLink: {
      DOMelement: null,
      linkHref: null,
    },
    linkStyle: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
  };

  // method for handling side toolbar
  // it adds the additional class name
  // and shows the toolbar
  handleSideButtonClick = () => {
    if (this.state.showLinkPopup) {
      this.setState({
        showLinkPopup: false,
      });
    }
    document.querySelector('.ql-toolbar').classList.add('sideMenu');
    this.quill.editor.theme.tooltip.edit();
    this.quill.editor.theme.tooltip.show();
  };

  handleChange = html => {
    this.setState({ editorHtml: html });
    if (this.state.showLinkPopup) {
      this.setState({
        showLinkPopup: false,
      });
    }
  };

  onTargetLinkHrefChange = e =>
    this.setState({
      targetLink: { ...this.state.targetLink, linkHref: e.target.value },
    });

  setTargetLinkHref = () => {
    // state contains DOM NODE -> have to mutate
    this.state.targetLink.DOMelement.href = this.state.targetLink.linkHref;
  };

  triggerLinkPopup = e => {
    if (!this.state.showLinkPopup) {
      this.setState({
        showLinkPopup: true,
        linkStyle: {
          ...this.state.linkStyle,
          top: e.pageY + 17,
          left: e.pageX - 150,
        },
      });
    }
    if (this.state.targetLink.DOMelement !== e.target) {
      this.setState({
        showLinkPopup: true,
        targetLink: {
          ...this.state.targetLink,
          linkHref: e.target.href,
          DOMelement: e.target,
        },
      });
    }
  };

  handleAdditionalMenu = () => {
    // https://stackoverflow.com/a/3545073
    const selection = window.getSelection
      ? window.getSelection()
      : document.selection.createRange();

    const toolbarClassList = document.querySelector('.ql-toolbar').classList;

    if (selection.type === 'Range' && this.state.showLinkPopup) {
      this.setState({ showLinkPopup: false });
    }

    // if no text selected and side menu toolbar applied -> reset it to the main toolbar
    if (selection.type === 'Caret' && toolbarClassList.contains('sideMenu')) {
      toolbarClassList.remove('sideMenu');
    }

    // side toolbar is only applied by clicking on a button,
    // so if text selected and side toolbar applied -> reset it to the main toolbar and show it
    if (selection.type === 'Range' && toolbarClassList.contains('sideMenu')) {
      toolbarClassList.remove('sideMenu');
      this.quill.editor.theme.tooltip.show();
    }
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

  componentDidUpdate() {
    document
      .querySelectorAll('.ql-editor a')
      .forEach(a => a.addEventListener('click', this.triggerLinkPopup));
  }

  componentDidMount() {
    document
      .querySelector('.quill')
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

  componentWillUnmount() {
    document
      .querySelector('.quill')
      .removeEventListener('mouseup', this.handleAdditionalMenu);
    document
      .querySelector('.quill')
      .removeEventListener('mouseup', this.handeSideButtonPosition);
    document
      .querySelectorAll('.ql-editor a')
      .forEach(a => a.removeEventListener('click', this.triggerLinkPopup));
  }

  render() {
    const {
      theme,
      editorHtml,
      targetLink,
      showLinkPopup,
      linkStyle,
    } = this.state;
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
          onClick={this.handleSideButtonClick}
        >
          +
        </button>
        {showLinkPopup && (
          <LinkPopup
            linkStyle={linkStyle}
            targetLinkHref={targetLink.linkHref}
            onTargetLinkHrefChange={this.onTargetLinkHrefChange}
            setTargetLinkHref={this.setTargetLinkHref}
          />
        )}
      </Fragment>
    );
  }
}

export default Editor;
