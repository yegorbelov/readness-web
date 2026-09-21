import '@/App.css';
import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import BookPage from '@/pages/BookPage';
import AdminPage from '@/pages/AdminPage';
import { AuthProvider } from '@/contexts/AuthContext';
import ProfilePage from './pages/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename='/readness-web'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/book/:id' element={<BookPage />} />
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
