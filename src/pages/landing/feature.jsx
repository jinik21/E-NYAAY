import img1 from "../../images/chat.gif";
import img2 from "../../images/notes.gif";
import img4 from "../../images/rating.gif";
import img5 from "../../images/session.gif";
import img6 from "../../images/call.gif";

export const Features = (props) => {
  return (
    <div
      style={{
        background: "white",
      }}
      id="features"
      className="col col-centered text-center mt-5"
    >
      <div className="container-fluid">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div>
          <div className="col-md-2">
            {" "}
            <img
              src={img6}
              alt = ""
              style={{
                height: "80%",
                width: "80%",
              }}
            />
            <h3>{"Video Call"}</h3>
            <p>{"Real-time court session."}</p>
          </div>
          <div className="col-md-2">
            {" "}
            <img
              src={img5}
              alt = ""
              style={{
                height: "80%",
                width: "80%",
              }}
            />
            <h3>{"Session Scheduler"}</h3>
            <p>{"Notification system for reminder to lawyer"}</p>
          </div>
          <div className="col-md-2">
            {" "}
            <img
              src={img2}
              alt = ""
              style={{
                height: "80%",
                width: "80%",
              }}
            />
            <h3>{"Real-time Headnote Generation"}</h3>
            <p>
              {
                "Hassle-free way to indulge in a session with automatic notes transcription"
              }
            </p>
          </div>
        {/* <div className="col-md-2">
            {" "}
            <img
            src={img3}
            style={{
                height: "80%",
                width: "80%",
            }}
            />
            <h3>{"Online Prescription"}</h3>
            <p>{"Get prescription from your doctor."}</p>
        </div> */}
          <div className="col-md-2">
            {" "}
            <img
              src={img1}
              alt = ""
              style={{
                height: "80%",
                width: "80%",
              }}
            />
            <h3>{"Citiation Recommendation"}</h3>
            <p>{"To help lawyer prepare better"}</p>
          </div>
          <div className="col-md-2">
            {" "}
            <img
              src={img4}
              alt = ""
              style={{
                height: "80%",
                width: "80%",
              }}
            />
            <h3>{"Decentralized storage of Evidence"}</h3>
            <p>{"To prevent evidence tampering"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
