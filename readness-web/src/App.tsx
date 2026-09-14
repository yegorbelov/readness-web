// import { useState } from 'react';
import { Header } from './components/Header/Header';
import { BookList } from './components/BookList/BookList';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className='main-photo'>
        <div className='main-quote-wrapper'>
          <span className='main-quote'>
            Recomendations you’ve <p />
            <span className='emphasize'>never</span> experienced{' '}
            <span className='emphasize'>before</span>
          </span>
        </div>
        <img
          className='reading-girl'
          src='../src/assets/images/reading-girl.jpg'
        />
      </div>
      <div className='main'>
        <BookList />
      </div>
      <Footer />
    </>
  );
}

export default App;
