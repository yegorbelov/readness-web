// import { useState } from 'react';
import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import BookPage from '@/pages/BookPage';

import '@/App.css';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter basename='/readness-web'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/book/:id' element={<BookPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
