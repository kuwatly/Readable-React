import React, { Component } from 'react';
import '../App.css';
import CategoryList from "./CategoryList";

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Readable</h1>
          </header>
          <p className="App-intro">
            Welcome to Readable
          </p>
          <CategoryList />
        </div>
    );
  }
}

export default App;
