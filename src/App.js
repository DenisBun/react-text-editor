import React, { Component } from 'react';
// import injector from 'react-frame-aware-selection-plugin';

import { TextEditor } from './editor';
import './App.css';
 
// injector(); https://github.com/airbnb/enzyme/issues/47

class App extends Component {
  render() {
    return (
      <div className="App">
        <TextEditor />
      </div>
    );
  }
}

export default App;
