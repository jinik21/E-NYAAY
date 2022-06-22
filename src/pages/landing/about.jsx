export const About = (props) => {
    return (
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {" "}
              <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>About Us</h2>
                <h3>Why Choose Us?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <p className="text-dark fs-4">
                      We offer access to mental health treatment to people
                      <br /> in urban,rural or remote areas.Those who live in
                      rural
                      <br />
                      areas simply might not have access to any form of mental
                      <br />
                      health treatment because there are few or no mental heal-
                      <br />
                      th practices in their area.We are here to connect to you &
                      <br /> help you
                    </p>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <p className="text-dark fs-4">
                      Online therapy is usually fairly affordable and convenient.
                      <br /> Since you will be attending therapy sessions online
                      in the
                      <br /> comfort of your own home, you can often schedule your
                      <br />
                      therapy sessions for times that are the most convenient
                      <br />
                      for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  