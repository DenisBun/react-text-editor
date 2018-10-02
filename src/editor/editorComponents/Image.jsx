import React from 'react'
import {findDOMNode} from 'slate-react'

class Image extends React.Component {
  state = {}

  componentDidMount() {
    console.log(this.props)
    const { node } = this.props
    const { data } = node
    const file = data.get('file')
    this.load(file)
  }

  load(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }))
    reader.readAsDataURL(file)
  }

  render() {
    const { attributes } = this.props;
    const { src } = this.state;
    return src ? <img {...attributes} src={src} /> : <span {...attributes}>Loading...</span>
  }
}

export default Image;