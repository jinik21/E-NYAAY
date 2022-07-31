import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboardlawyer/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Submit Case",
    href: "/dashboardlawyer/submitcase",
    icon: "bi bi-bell",
  },
  {
    title: "Case Queries",
    href: "/dashboardlawyer/queries",
    icon: "bi bi-patch-check",
  },
  {
    title: "Case Track",
    href: "/dashboardlawyer/track",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Profile",
    href: "/dashboardlawyer/profile",
    icon: "bi bi-hdd-stack",
  }
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  function log(){
    console.log(location.pathname);
  }

  return (
    <div className="bg-dark" style={{height:"100vh"}}>
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
              onClick={log}
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))} 
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
