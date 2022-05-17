import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import React, { useState, useEffect } from "react";
import Video from "./Video";

const config = { mode: "rtc", codec: "vp8" };
const appId = "370cc8b63bac46d381f17915984b033d";
const VideoCall = (props) => {
  console.log(props);
  const { sessionId } = props.match.params;
  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  const [inCall, setInCall] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const init = async () => {
      let data = await fetch(
        `http://localhost:3001/api/agora-call/token?channel=abcd`
      );
      data = await data.json();
      console.log(data);
      setToken(data.token);
    };
    init();
    setInCall(true);
  }, [sessionId]);
  // const onClickHandler = () => {

  return (
    <div>
      {inCall  &&token? (
        <div>
          <Video
            useClient={useClient}
            useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks}
            appId={appId}
            token={token}
            inCall={inCall}
            setInCall={setInCall}
            channelName="abcd"
            sessionId="abcd"
            history={props.history}
          />
        </div>
      ) : (
        <div className="row">
           <div>
            <button onClick={null} type="button" id="join">
              JOIN
            </button>
            <button onClick={null} type="button" id="leave">
              LEAVE
            </button>
          </div> 
        </div>
      )}
    </div>
  );
};

export default VideoCall;
