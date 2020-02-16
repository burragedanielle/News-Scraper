import React from 'react';
import Header from './components/header/header';
import Jumbotron from './components/jumbotron/jumbotron';
import Article from './components/articles/article';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Jumbotron />
      <Article />
    </div>
  );
}

export default App;
