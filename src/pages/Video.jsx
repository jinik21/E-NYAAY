import { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import Controls from "./Controls";
import AgoraRTM from "agora-rtm-sdk";
import useAgoraRtm from "./useAgoraRtm";
const clientRTM = AgoraRTM.createInstance("370cc8b63bac46d381f17915984b033d");
var storageRef = firebase.storage().ref();

const Video = ({
  useClient,
  useMicrophoneAndCameraTracks,
  useScreenVideoTrack,
  channelName,
  inCall,
  setInCall,
  appId,
  token,
  sessionId,
  history,
}) => {
  const [users, setUsers] = useState([]);
  const [, setStart] = useState(false);
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState([""]);
  const client = useClient();
  const { message, sendMessage } = useAgoraRtm(
    channelName,
    sessionId,
    clientRTM
  );

  var SpeechRecognition =
    window.webkitSpeechRecognition || window.speechRecognition;
  var recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.continuous = true;
  // RTM Global Vars

  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const {
    ready: readyScreen,
    tracks: trackScreen,
    error: errorScreen,
  } = useScreenVideoTrack();
  console.log(readyScreen, trackScreen, errorScreen);
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
      // if (trackScreen) await client.publish(trackScreen);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };
    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, ready, tracks, client, appId, token, users]);

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
