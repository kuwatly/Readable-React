import React, { Component } from 'react';
import '../App.css';
import CategoryList from "./CategoryList";
import CategoryItem from "./CategoryItem";
import PostList from "./PostList";
import { Route, withRouter } from 'react-router-dom';
import Dialogs from "./Dialogs";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="App-title">Readable Web App</h1>
          </header>
          <p className="App-intro">
            Content and Comment
          </p>
          <Dialogs/>
          <Route exact path="/" render={() => (
            <div align="center">
              <CategoryList/>
              <PostList/>
            </div>
          )}/>
          <Route exact path="/:category"
                 render={({match: {params: {category}}}) => (
                   <div align="center">
                     <CategoryItem category={{name: category, path: category, detailView: true}}/>
                     <PostList currentCategory = {category}/>
                   </div>
                 )}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
