import React, { Component } from 'react';
import '../App.css';
import CategoryList from "./CategoryList";
import CategoryItem from "./CategoryItem";
import PostList from "./PostList";
import PostItem from "./PostItem";
import CommentList from "./CommentList";
import { Route, withRouter } from 'react-router-dom';
import Dialogs from "./Dialogs";
import PageNotFound from "./PageNotFound";

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
          <Route exact path="/:category" render={({match: {params: {category}}}) => (
            <div align="center">
              <CategoryItem category={{name: category, path: category, detailView: true}}/>
              <PostList currentCategory={category}/>
            </div>)}/>
          <Route exact path="/:category/:post_id" render={({match: {params: {category, post_id}}}) => (
            <div align="center">
              <PostItem currentCategory={category} currentPostID={post_id}/>
              <CommentList currentPostID={post_id}/>
            </div>)}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
