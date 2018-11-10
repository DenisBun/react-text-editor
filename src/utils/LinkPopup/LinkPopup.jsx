import React, { Component, Fragment } from 'react';
import Icon from 'react-icons-kit';
import { check } from 'react-icons-kit/fa/check';
import { ic_edit } from 'react-icons-kit/md/ic_edit';

import './LinkPopup.css';

class LinkPopup extends Component {
  state = {
    showEditableInput: false,
  };

  handleRedirect = e => {
    e.preventDefault();
    window.open(this.props.targetLinkHref, '_blank');
  };

  handleOpenInput = () => {
    this.setState({ showEditableInput: true });
  };

  render() {
    const { showEditableInput } = this.state;
    return (
      <div style={this.props.linkStyle} className="linkPopup">
        {!showEditableInput && (
          <Fragment>
            <a
              className="newLink"
              onClick={this.handleRedirect}
              href={this.props.targetLinkHref}
            >
              {this.props.targetLinkHref}
            </a>
            <button className="saveBtn" onClick={this.handleOpenInput}>
              <Icon icon={ic_edit} />
            </button>
          </Fragment>
        )}
        {showEditableInput && (
          <Fragment>
            <input
              className="linkInput"
              value={this.props.targetLinkHref}
              onChange={this.props.onTargetLinkHrefChange}
            />
            <button className="saveBtn" onClick={this.props.setTargetLinkHref}>
              <Icon icon={check} />
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default LinkPopup;
