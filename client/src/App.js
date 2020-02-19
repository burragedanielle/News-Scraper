import React, { Component } from 'react';
import Header from './components/header/header';
import Jumbotron from './components/jumbotron/jumbotron';
import Article from './components/articles/article';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Jumbotron />
        <container>
          <Article />
        </container>

      </div>
    );
  }
}

export default App;
