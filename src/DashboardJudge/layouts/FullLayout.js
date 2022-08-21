import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const DashboardJudge = ({ passable }) => {
  let location = useLocation();
  console.log(location);
  console.log(passable);
  // const { account, court } = passable;
  // useEffect(() => {
  //   const getUserInformation = async () => {
  //     try {
  //       await court.methods.getLawyerInfo(account).call((e, r) => {
  //         console.log(r);
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getUserInformation();
  // }, []);
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default DashboardJudge;
