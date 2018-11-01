import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';

import Editor from './Editor';
import './App.css';

class App extends Component {
  // state = {
  //   emojies: []
  // }
  // addEmoji = smth => this.setState({emojies: [...this.state.emojies, smth]})
  render() {
    return (
      <div className="App">
        <Editor headline="<h1>Let the magic happen<h1>" />
        {/* <Picker onSelect={this.addEmoji} />
        {this.state.emojies.map(emoji => (
          <Emoji emoji={{...emoji}} size={15} />
        ))} */}
      </div>
    );
  }
}

export default App;
