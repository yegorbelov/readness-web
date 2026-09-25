import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';

import HomePage from '@/pages/HomePage/HomePage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import BookPage from '@/pages/BookPage/BookPage';
import AdminPage from '@/pages/AdminPage/AdminPage';
import NotFoundPage from '@/pages/NotFound/NotFound';
import MyBooks from './pages/MyBooks/MyBooks';
import NewBookPage from './pages/NewBookPage/NewBookPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename='/readness-web'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/book/:id' element={<BookPage />} />
          <Route path='/mybooks' element={<MyBooks />} />
          <Route
            path='/books/new'
            element={
              <ProtectedRoute>
                <NewBookPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin'
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
