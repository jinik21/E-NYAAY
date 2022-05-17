import React, { useEffect, useRef, useState } from "react";

const useAgoraRtm = (channelName, sessionId, client) => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const channel = useRef(client.createChannel(channelName)).current;

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const email = JSON.parse(localStorage.getItem("user")).email;
    let data = await fetch(
      `http://localhost:3001/api/agora-rtm/token?channel=${email}`
    );
    data = await data.json();
    console.log(data.token);
    setToken(data.token);
    await client.login({
      uid: email,
      token: data.token,
    });
    await channel.join();
  };

  useEffect(() => {
    channel.on("ChannelMessage", (data, uid) => {
      console.log({
        data,
        uid,
      });
      setMessage(data.text);
    });
  }, []);

  const sendMessage = async (text) => {
    await channel.sendMessage({
      text,
    });
  };

  return { message, sendMessage };
};

export default useAgoraRtm;
