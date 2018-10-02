import React from 'react'
import ReactDOM from 'react-dom'
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';
import { Button } from '../components'
import './HoverMenu.css';

class HoverMenu extends React.Component {

  render() {
    const { className, onRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <div className={`hoverMenu ${className}`} ref={onRef}>
        {this.renderMarkButton('bold', bold)}
        {this.renderMarkButton('italic', italic)}
        {this.renderMarkButton('underlined', underline)}
        {this.renderMarkButton('code', code)}
      </div>,
      root
    )
  }

  renderMarkButton(type, icon) {
    const { value } = this.props;
    const isActive = value.activeMarks.some(mark => mark.type == type);
    return (
      <Button
        reversed
        active={isActive}
        onPointerDown={event => this.onClickMark(event, type)}
      >
        <Icon style={{fontSize: '18'}} icon={icon} />
      </Button>
    )
  }


  onClickMark(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    const change = value.change().toggleMark(type)
    onChange(change)
  }
}

export default HoverMenu;