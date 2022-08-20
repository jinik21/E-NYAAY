import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewCases = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [cases,setCases] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const func = async () => {
      const email = user.email;
      const token = user.token;
      console.log(token);
      console.log(email);
      const {data} = await axios.get("http://localhost:3001/case/getByStatus?status="+"NEW",{
        headers: {
          "authorization": `Bearer ${token}`,
        }
      })
      console.log(data);
      setCases((prev) => {
        return [...prev, ...data.casesByStatus]
      });
      // console.log(cases);
    };
    func();
  }, []);

  const AboutCase = (_id) =>{
    console.log(_id);
    navigate("/dashboardadmin/case-info",{
      state: {
        id: _id
      }
    })
  }

  return (
    <div>
      <h5 className="mb-3">New Cases</h5>
      <div className="row">
      {cases.map((ele,i) => {
            console.log(ele._id)
            return <div key={i} className="col-xl-6 col-sm-12 py-2">
              <div className="ses-info" onClick={() => AboutCase(ele._id)}>
                <h1>{ele.nameOfPlantiff}</h1>
                {ele.status==="VERIFIED"?(<p style={{color:'green'}}>Status: Accepted</p>):
                (ele.status==="REJECTED"?(<p style={{color:'red'}}>Status: Rejected</p>):(<p style={{color:'#FFAF33'}}>Status: Pending</p>))}
                <p>{ele.nameOfDefendant}</p>
                <p>{ele._id}</p>
                <p>{ele.summaryOfComplaint}</p>
              </div>
          </div>
          })} 
      </div>
    </div>
  );
};

export default NewCases;


