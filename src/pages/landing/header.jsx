export const Header = (props) => {
    return (
      <header
        id="header"
        style={{
          width: "100%",
        }}
      >
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    Welcome to E-NYAAY.
                    <span></span>
                  </h1>
                  <p>We are here to help you!</p>
                  <a
                    href="#features"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Learn More
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };
  