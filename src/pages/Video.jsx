import {
  AgoraVideoPlayer,
  createClient,
  createScreenVideoTrack,
} from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import Controls from "./Controls";
import AgoraRTM from "agora-rtm-sdk";
import useAgoraRtm from "./useAgoraRtm";
const clientRTM = AgoraRTM.createInstance("370cc8b63bac46d381f17915984b033d");
var storageRef = firebase.storage().ref();

const config = { mode: "rtc", codec: "vp8" };
const Video = ({
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
  inCall,
  setInCall,
  appId,
  token,
  sessionId,
  history,
}) => {
  const [users, setUsers] = useState([]);
  const [shareState, setShareState] = useState(false);
  const [, setStart] = useState(false);
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState([""]);
  const client = useClient();
  const useScreenClient = createClient(config);
  const shareClient = useScreenClient();
  const { message, sendMessage } = useAgoraRtm(
    channelName,
    sessionId,
    clientRTM
  );
  const useScreenVideoTrack = createScreenVideoTrack({
    encoderConfig: "1080p_1",
    // Set the video transmission optimization mode as prioritizing video quality.
    optimizationMode: "detail",
  });
  const {
    ready: readyScreen,
    tracks: trackScreen,
    error: errorScreen,
  } = useScreenVideoTrack();

  var SpeechRecognition =
    window.webkitSpeechRecognition || window.speechRecognition;
  var recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.continuous = true;
  // RTM Global Vars

  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    recognition.start();
    recognition.onresult = function (event) {
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript;
      // setText(transcript)
      console.log(transcript);
      setText((prev) => {
        return [...prev, transcript];
      });
      setDisplayText((prev) => {
        return [...prev, transcript];
      });
      sendMessage(transcript);
    };
  }, []);

  useEffect(() => {
    const init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [user];
          });
          console.log(users);
        }
        if (mediaType === "audio" && user) {
          user.audioTrack?.play();
        }
        // recognition.start();
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };
    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, ready, tracks, client, appId, token, users]);
  // channelName, ready, tracks, client, appId, token, users

  useEffect(() => {
    const screenInit = async () => {
      console.log(trackScreen);
      shareClient.on("user-published", async (user, mediaType) => {
        await shareClient.subscribe(user, mediaType);
        console.log("subscribe success");
        console.log("inside share client", user);
      });
      shareClient.on("user-unpublished", async (user, type) => {
        console.log("unpublished", user, type);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
        await shareClient.unpublish();
      });

      shareClient.on("user-left", async (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
        await shareClient.unpublish();
      });
    };
    screenInit();
  }, [trackScreen, shareClient]);

  const shareScreen = async () => {
    if (shareState || !trackScreen || errorScreen) {
      console.log("shareClient");
      await shareClient.leave();
      setUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== shareClient.uid);
      });
      setShareState(false);
    } else if (!shareState && readyScreen && trackScreen) {
      const res = await shareClient.join(appId, channelName, token, null);
      if (res) {
        console.log(new Date().getTime(), "joined");
        console.log(res);
        setShareState(true);
        if (trackScreen) {
          const result = await shareClient.publish(trackScreen);
          console.log(new Date().getTime(), "published", result);
        }
      }
    }
  };

  return (
    <div>
      {inCall && tracks && (
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{
            height: "100vh",
            width: "100vw",
            // zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {ready && tracks && (
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
              client={client}
              sessionId={sessionId}
              history={history}
              shareScreen={shareScreen}
              // generateReport={generateReport}
            />
          )}
          {users.length > 0 &&
            users.map((user, i) => {
              console.log(users);
              return (
                <AgoraVideoPlayer
                  key={user.uid}
                  videoTrack={user.videoTrack}
                  style={{
                    height: "30%",
                    width: "320px",
                    zIndex: 2,
                    position: "absolute",
                    bottom: "10%",
                    right: 0,
                  }}
                />
              );
            })}
        </AgoraVideoPlayer>
      )}
    </div>
  );
};

export default Video;
