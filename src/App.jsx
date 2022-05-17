import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from './pages';
import { PrivateRoute, ProtectedRoute } from './routes';

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
        path='/register'
        element={
          <ProtectedRoute>
            <RegisterPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;