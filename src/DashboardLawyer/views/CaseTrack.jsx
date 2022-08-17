import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import React, { useEffect, useState } from "react";

var BlogData = [
    // {
    //   image: bg1,
    //   title: "This is simple blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg2,
    //   title: "Lets be simple blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg3,
    //   title: "Don't Lamp blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg4,
    //   title: "Simple is beautiful",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg1,
    //   title: "This is simple blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg2,
    //   title: "Lets be simple blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg3,
    //   title: "Don't Lamp blog",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
    // {
    //   image: bg4,
    //   title: "Simple is beautiful",
    //   subtitle: "2 comments, 1 Like",
    //   description:
    //     "This is a wider card with supporting text below as a natural lead-in to additional content.",
    //   btnbg: "primary",
    // },
];

const CaseTrack = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [cases,setCases] = useState([]);
  useEffect(() => {
    const func = async () => {
      const email = user.email;
      const token = user.token;
      console.log(token);
      console.log(email);
      let data = await fetch(
        "http://localhost:3001/case/get/"+email,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          }
        }
      );
      data = await data.json();
      console.log(data.cases);
      setCases(cases => [...cases, data.cases]);
      console.log(cases);
    };
    func();
  }, []);
  return (
    <div>
      <h5 className="mb-3">All Cases</h5>
      <div className="row">
                  {BlogData.map((ele,i) => (
                    <div key={i} className="col-xl-6 col-sm-12 py-2">
                      <div className="ses-info">
                        <h1>{ele.nameOfPlantiff}</h1>
                        {/* {ele.status==="1"?(<p style={{color:'green'}}>Accepted</p>):
                        (ele.status==="-1"?(<p style={{color:'red'}}>Rejected</p>):(<p style={{color:'#FFAF33'}}>Pending</p>))} */}
                        <p>{ele.nameOfDefendant}</p>
                        <p>{ele._id}</p>
                        <p>{ele.summaryOfComplaint}</p>
                      </div>
                  </div>
                  ))}
                </div>
    </div>
  );
};

export default CaseTrack;
