import { createClient, createCameraVideoTrack } from "agora-rtc-react";
import React, { useState, useEffect } from "react";
import Video from "./Video";
import { useParams } from "react-router-dom";

const config = { mode: "rtc", codec: "vp8" };
const appId = "370cc8b63bac46d381f17915984b033d";
const VideoCall = (props) => {
  const match = useParams();
  console.log(match);
  const { sessionId } = match;
  const useClient = createClient(config);

  // const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  const useCameraTrack = createCameraVideoTrack();

  const [inCall, setInCall] = useState(true);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const init = async () => {
      let data = await fetch(
        `http://localhost:3001/api/agora-call/token?channel=${sessionId}`
      );
      data = await data.json();
      console.log(data);
      setToken(data.agoraToken);
    };
    init();
    setInCall(true);
  }, [sessionId]);

  console.log({ inCall, token });

  return (
    <div>
      {inCall && token ? (
        <div>
          <Video
            useClient={useClient}
            useCameraTrack={useCameraTrack}
            appId={appId}
            token={token}
            inCall={inCall}
            setInCall={setInCall}
            channelName={sessionId}
            sessionId={sessionId}
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
