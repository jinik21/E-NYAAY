import { useNavigate } from "react-router-dom";

export const Navigation = (props) => {
  let navigate = useNavigate();
  return (
    <nav
      id="menu"
      className=" navbar navbar-expand-lg navbar-light bg-light"
      style={{
        width: "100%",
      }}
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
                E-Nyaay
          </a>{" "}
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav navbar-nav navbar-right">
            <li class="nav-item active">
              <a
                className="fs-2 fw-bold page-scroll text-dark"
                href="#features"
              >
                Features
              </a>
            </li>
            <li class="nav-item">
              <a href="#about" className="fs-2 fw-bold page-scroll text-dark">
                About
              </a>
            </li>
            {/* <li class="nav-item">
              <a
                className="fs-2 fw-bold page-scroll text-dark"
                onClick={() => history.push("/register")}
              >
                Signup
              </a>
            </li> */}
            <li class="nav-item">
              <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle fs-2 fw-bold page-scroll text-dark" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Sign Up
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li><a class="dropdown-item fs-2 fw-bold page-scroll text-dark" href="/register">Lawyer</a></li>
                      <li><a class="dropdown-item fs-2 fw-bold page-scroll text-dark" href="/register_judge">Judge</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle fs-2 fw-bold page-scroll text-dark" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Login
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li><a class="dropdown-item fs-2 fw-bold page-scroll text-dark" href="/login_lawyer">Lawyer</a></li>
                      <li><a class="dropdown-item fs-2 fw-bold page-scroll text-dark" href="/login_judge">Judge</a></li>
                      <li><a class="dropdown-item fs-2 fw-bold page-scroll text-dark" href="/login_admin">Admin</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
