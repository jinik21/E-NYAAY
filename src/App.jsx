import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  LoginLawyerPage,
  RegisterPage,
  VideoCall,
} from "./pages";
import { PrivateRoute, ProtectedRoute } from "./routes";
import Landing2 from "./pages/landing/landing";
import "./App.css";
import Dashboard from "./Dashboard/layouts/FullLayout";
import DashboardLawyer from "./DashboardLawyer/layouts/FullLayout";
import Starter from "./Dashboard/views/Starter";
import About from "./Dashboard/views/About";
import StarterLawyer from "./DashboardLawyer/views/Starter";
import SubmitCase from "./DashboardLawyer/views/SubmitCase";
import CaseQueries from "./DashboardLawyer/views/CaseQueries";
import CaseTrack from "./DashboardLawyer/views/CaseTrack";
import AboutLawyer from "./DashboardLawyer/views/About";
import Blockchain from "./pages/Blockchain";
import Profile from "./DashboardLawyer/views/profile";
import Chat from "./DashboardLawyer/views/chat";
import web3 from "./ethereum/web3";
import { useEffect, useState } from "react";
import court from "./ethereum/factory";
import { get } from "firebase/database";

function App() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    account: "",
    court: "",
    GAS: 500000,
    GAS_PRICE: "20000000000",
  });

  useEffect(() => {
    const getBlockchainData = async () => {
      const accounts = await web3.eth.getAccounts();
      setState((prev) => {
        return { ...prev, account: accounts[0], court };
      });
      setLoading(false);
    };
    getBlockchainData();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Landing2 passable={state} />} />
      <Route exact path="/login" element={<LoginPage passable={state} />} />
      <Route
        exact
        path="/login_lawyer"
        element={<LoginLawyerPage passable={state} />}
      />
      <Route
        exact
        path="/call/:sessionId"
        element={<VideoCall passable={state} />}
      />
      <Route
        exact
        path="/register"
        element={<RegisterPage passable={state} />}
      />
      <Route exact path="/landing" element={<Landing2 passable={state} />} />
      <Route exact path="/dashboard" element={<Dashboard passable={state} />}>
        <Route
          exact
          path="/dashboard/starter"
          element={<Starter passable={state} />}
        />
        <Route
          exact
          path="/dashboard/about"
          element={<About passable={state} />}
        />
      </Route>
      <Route
        exact
        path="/dashboardlawyer"
        element={<DashboardLawyer passable={state} />}
      >
        <Route
          exact
          path="/dashboardlawyer/starter"
          element={<StarterLawyer passable={state} />}
        />
        <Route
          exact
          path="/dashboardlawyer/submitcase"
          element={<SubmitCase passable={state} />}
        />
        <Route
          exact
          path="/dashboardlawyer/queries"
          element={<Chat passable={state} />}
        />
        <Route
          exact
          path="/dashboardlawyer/track"
          element={<CaseTrack passable={state} />}
        />
        <Route
          exact
          path="/dashboardlawyer/profile"
          element={<Profile passable={state} />}
        />
      </Route>
      <Route exact path="/block" element={<Blockchain passable={state} />} />
    </Routes>
  );
}

export default App;
