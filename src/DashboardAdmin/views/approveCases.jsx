import React from "react";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";

const ApproveCases = () =>{
    var BlogData = [
        {
          image: bg1,
          title: "This is simple blog",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
        {
          image: bg2,
          title: "Lets be simple blog",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
        {
          image: bg3,
          title: "Don't Lamp blog",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
        {
          image: bg4,
          title: "Simple is beautiful",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
        {
          image: bg1,
          title: "This is simple blog",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
        {
          image: bg2,
          title: "Lets be simple blog",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
        {
          image: bg3,
          title: "Don't Lamp blog",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
        {
          image: bg4,
          title: "Simple is beautiful",
          subtitle: "2 comments, 1 Like",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          btnbg: "primary",
        },
    ];
    const Accept = () =>{
        console.log("accept button pressed");
    }
    const Reject = () => {
        console.log("reject button pressed");
    }
    return( 
    <div>
        <h1>Approve Cases</h1>
        <div className="row">
          {BlogData.map((ele, i)=>{
            return <div key={i} className="col-xl-6 col-sm-12 py-2">
                 <div className="ses-info">
                        <h1>{ele.title}</h1>
                        <p>{ele.user}</p>
                        <p>{ele.date}</p>
                        <p>{ele.time}</p>
                        <button onClick={Accept}>Accept</button>
                        <button onClick={Reject}>Reject</button>
                      </div>
             </div>
          })}    
      </div>
    </div>
    );
} 

export default ApproveCases;