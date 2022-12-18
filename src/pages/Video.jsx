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
import { summarization_example } from "../utils/user";
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");
const clientRTM = AgoraRTM.createInstance("370cc8b63bac46d381f17915984b033d");
var storageRef = firebase.storage().ref();

const config = { mode: "rtc", codec: "vp8" };
const Video = ({
  useClient,
  useCameraTrack,
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
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.lang = "en-US";
  // RTM Global Vars

  const { ready, track } = useCameraTrack();

  const key = "7e8e3a179a7e452bab09012204016883";
  const endpoint = "https://e-nyaaystt.cognitiveservices.azure.com/";
  // Authenticate the client with your key and endpoint
  const textAnalyticsClient = new TextAnalyticsClient(
    endpoint,
    new AzureKeyCredential(key)
  );

  useEffect(() => {
    recognition.start();
    recognition.onresult = function (event) {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(" ");
      console.log(transcript);
      summarization_example(textAnalyticsClient).catch((err) => {
        console.error("The sample encountered an error:", err);
      });
    };
  }, []);

  useEffect(() => {
    const init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
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
      if (track) await client.publish([track]);
      setStart(true);
    };
    if (ready && track) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, ready, track, client, appId, token, users]);
  // channelName, ready, tracks, client, appId, token, users

  return (
    <div>
      {inCall && track && (
        <AgoraVideoPlayer
          videoTrack={track}
          style={{
            height: "100vh",
            width: "100vw",
            // zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {ready && track && (
            <Controls
              track={track}
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
