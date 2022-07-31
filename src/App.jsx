import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, LoginLawyerPage, RegisterPage, VideoCall } from './pages';
import { PrivateRoute, ProtectedRoute } from './routes';
import Landing2 from './pages/landing/landing';
import './App.css';
import Dashboard from './Dashboard/layouts/FullLayout';
import DashboardLawyer from './DashboardLawyer/layouts/FullLayout';
import Starter from './Dashboard/views/Starter';
import About from './Dashboard/views/About';
import StarterLawyer from './DashboardLawyer/views/Starter';
import SubmitCase from './DashboardLawyer/views/SubmitCase';
import CaseQueries from './DashboardLawyer/views/CaseQueries';
import CaseTrack from './DashboardLawyer/views/CaseTrack';
import AboutLawyer from './DashboardLawyer/views/About';

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
        exact path='/login_lawyer'
        element={
            <LoginLawyerPage />
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
      <Route
        exact path='/dashboardlawyer'
        element={
            <DashboardLawyer />
        }
      >
        <Route exact path="/dashboardlawyer/starter" element={<StarterLawyer />} />
        <Route exact path="/dashboardlawyer/submitcase" element={<SubmitCase />} />
        <Route exact path="/dashboardlawyer/queries" element={<CaseQueries />} />
        <Route exact path="/dashboardlawyer/track" element={<CaseTrack />} />
        <Route exact path="/dashboardlawyer/profile" element={<AboutLawyer />} />
      </Route>
    </Routes>
  );
}

export default App;
