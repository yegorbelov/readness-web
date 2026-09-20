// import { useState } from 'react';
import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import BookPage from '@/pages/BookPage';

import '@/App.css';
import AdminPage from './pages/AdminPage';
import LogInModal from './components/LogInModal/LogInModal';
import { useState } from 'react';

function App() {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  return (
    <BrowserRouter basename='/readness-web'>
      <Header onLogInClick={() => setIsLogInModalOpen(true)} />
      {isLogInModalOpen && (
        <LogInModal onClose={() => setIsLogInModalOpen(false)} />
      )}
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
