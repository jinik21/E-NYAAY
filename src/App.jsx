import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, VideoCall } from './pages';
import { PrivateRoute, ProtectedRoute } from './routes';
import Landing2 from './pages/landing/landing';
import './App.css';
import Dashboard from './Dashboard/layouts/FullLayout';
import Starter from './Dashboard/views/Starter';
import About from './Dashboard/views/About';

function App() {
  return (
    <Routes>
      <Route
        exact path='/'
        element={
            <Landing2 />
        }
      />
      <Route
        exact path='/login'
        element={
            <LoginPage />
        }
      />
      <Route
        exact path='/call/:sessionId'
        element={
            <VideoCall />
        }
      />
      <Route
        exact path='/register'
        element={
            <RegisterPage />
        }
      />
      <Route
        exact path='/landing'
        element={
            <Landing2 />
        }
      />
      <Route
        exact path='/dashboard'
        element={
            <Dashboard />
        }
      >
        <Route exact path="/dashboard/starter" element={<Starter />} />
        <Route exact path="/dashboard/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
