import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'


import Editor from './Editor';
import './App.css';
 

class App extends Component {
  state = {
    emojies: []
  }
  addEmoji = smth => this.setState({emojies: [...this.state.emojies, smth]})
  render() {
    return (
      <div className="App">
        <Editor placeholder={`It is a time to create your awesome event!
        \nStart typing something to let the magic happen...`} />
        <Picker onSelect={this.addEmoji} />
        {this.state.emojies.map(emoji => (
          <Emoji emoji={{...emoji}} size={15} />
        ))}
      </div>
    );
  }
}

export default App;
