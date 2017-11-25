import React, { Component } from 'react';
import '../App.css';
import CategoryList from "./CategoryList";
import PostList from "./PostList";
import { Route, withRouter } from 'react-router-dom';
import Dialogs from "./Dialogs";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Route exact path="/" render={() => (
            <div>
              <header className="App-header">
                <h1 className="App-title">Welcome to Readable</h1>
              </header>
              <p className="App-intro">
                Welcome to Readable
              </p>
              <Dialogs />
              <CategoryList />
              <PostList />
            </div>
          )}/>

        </div>
    );
  }
}

export default withRouter(App);
