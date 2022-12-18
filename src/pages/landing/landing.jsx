import { Navigation } from "../landing/naviagtion";
import { Header } from "../landing/header";
import { Features } from "../landing/feature";
import { About } from "../landing/about";
import SmoothScroll from "smooth-scroll";
import "../landing/landing.css";
import { useEffect } from "react";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

// var SpeechRecognition =
//   window.webkitSpeechRecognition || window.speechRecognition;
// var recognition = new SpeechRecognition();
// recognition.interimResults = true;
// recognition.continuous = true;
// recognition.lang = "en-US";

const Landing2 = () => {
  // useEffect(() => {
  //   recognition.start();
  //   recognition.onresult = function (event) {
  //     const transcript = Array.from(event.results)
  //       .map((result) => result[0])
  //       .map((result) => result.transcript)
  //       .join(" ");
  //     console.log(transcript);
  //   };
  // }, []);
  return (
    <div
      style={{
        background: "white",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Navigation />
      <Header />
      <Features />
      <About />
    </div>
  );
};

export default Landing2;
