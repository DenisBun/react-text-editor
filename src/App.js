import React, { Component } from 'react';
// import injector from 'react-frame-aware-selection-plugin';

// import { TextEditor } from './editor';
import Editor from './Editor';
import './App.css';
 
// injector(); https://github.com/airbnb/enzyme/issues/47

class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor placeholder="Let the magic happen" />
      </div>
    );
  }
}

export default App;
