import { Navigation } from "../landing/naviagtion";
import { Header } from "../landing/header";
import { Features } from "../landing/feature";
import { About } from "../landing/about";
import SmoothScroll from "smooth-scroll";
import '../landing/landing.css'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Landing2 = () => {
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