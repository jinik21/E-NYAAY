import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, VideoCall } from './pages';
import { PrivateRoute, ProtectedRoute } from './routes';
import Landing2 from './pages/landing/landing';
import './App.css'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/video'
        element={
          <ProtectedRoute>
            <VideoCall />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/landing'
        element={
          <ProtectedRoute>
            <Landing2 />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
