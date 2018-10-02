import { Editor } from 'slate-react'
import DropOrPasteImages from 'slate-drop-or-paste-images'
import PasteLinkify from 'slate-paste-linkify'
import MarkHotkeys from 'slate-mark-hotkeys';
import { Value } from 'slate'
import React from 'react'
import Image from './editorComponents/Image';
import initialValue from './initialValue.json'
import HoverMenu from './HoverMenu';

const plugins = [
  DropOrPasteImages({
    insertImage: (transform, file) => {
      return transform.insertBlock({
        type: 'image',
        isVoid: true,
        data: { file },
      })
    },
  }),
  MarkHotkeys(),
  PasteLinkify({
    type: 'link'
  })
]

class TextEditor extends React.Component {
  state = {
    value: Value.fromJSON(initialValue),
  };

  componentDidMount = () => {
    this.updateMenu();
  };

  componentDidUpdate = () => {
    this.updateMenu();
  };

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style');
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
  }

  renderMark = props => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
    }
  }
 

  renderNode = props => {
    console.log(props);
    switch (props.node.type) {
      case 'image':
        return <Image {...props} />
    }
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onClickRedo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().redo()
    this.onChange(change)
  }

  onClickUndo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().undo()
    this.onChange(change)
  }
   

  render() {
    return (
      <div>
        <button onPointerDown={this.onClickUndo}>
            undo
          </button>
          <button onPointerDown={this.onClickRedo}>
            redo
          </button>
        <HoverMenu
          onRef={menu => (this.menu = menu)}
          value={this.state.value}
          onChange={this.onChange}
        />
        <Editor
          plugins={plugins}
          placeholder="Enter some text..."
          value={this.state.value}
          onChange={this.onChange}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
        />
      </div>
    )
  }

}

export default TextEditor;