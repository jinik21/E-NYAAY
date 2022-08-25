import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

const CaseInfoJudge = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const [sessions,setSessions] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [caseInfo, setcaseInfo] = useState({});
    const [case_id, setCaseid] = useState("");
    useEffect(() => {
        const func = async () => {
            const caseid=location.state.id;
            const token = user.token;
            console.log(caseid);
            setCaseid(caseid);
            let data = await fetch(
                "http://localhost:3001/case/getById?id="+caseid,
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
              console.log(data);
              setcaseInfo(data.cases)
              console.log(caseInfo)
          };
          const func1 = async () => {
            const caseid=location.state.id;
            const token = user.token;
            console.log(caseid);
            let data1 = await fetch(
                "http://localhost:3001/sessions/get?caseId="+caseid,
                {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
                  }
                }
              );
              data1 = await data1.json();
              console.log(data1.sessions);
              setSessions((prev) => {
                return [...prev, ...data1.sessions]
              });
              console.log(sessions);
          };
          func();
          func1();
    }, []);
    const handleVideo = async(e)=>{
      e.preventDefault();
      navigate("/call/"+location.state.id, {
        replace: false,
        state: {
          user: user,
          path: location.pathname
        },
      });
    }
    const AboutSession = (ele) =>{
      console.log(ele);
      navigate("/dashboardjudge/session-info",{
        state: {
          id: ele._id,
          emailOfPlantiff:ele.emailOfPlantiff,
          emailOfDefendant:ele.emailOfDefendant,
          emailOfPlantiffLawyer:ele.emailOfPlantiffLawyer,
          emailOfDefendantLawyer:ele.emailOfDefendantLawyer,
          emailOfJudge:ele.emailOfJudge,
          scheduledDate:ele.scheduledDate,
          upcoming:ele.upcoming,
          caseId:ele.caseId,
        }
      })
    }
    return(
        <div>
            <h1>About case id: {location.state.id}</h1>
            <Row>
      <Col lg="12">
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Judge</th>
              </tr>
            </thead>
            <tbody>
            <tr className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">Judge</h6>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                </td>
                </tr>
            </tbody>
          </Table>
      </Col>
      <Col lg="12">
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Summary Of Complaint</th>
              </tr>
            </thead>
            <tbody>
            <tr className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{caseInfo.summaryOfComplaint}</h6>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                </td>
                </tr>
            </tbody>
          </Table>
      </Col>
      <Col lg="12">
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Case Status</th>
                <th>Nature Of Complaint</th>
                <th>Fee Amount</th>
              </tr>
            </thead>
            <tbody>
            <tr className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{caseInfo.status}</h6>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{caseInfo.natureOfComplaint}</h6>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{caseInfo.feeAmount}</h6>
                        <span className="text-muted"></span>
                      </div>
                    </div>
                </td>
                </tr>
            </tbody>
          </Table>
      </Col>
      <Col lg="12" style={{margin:"10px"}}>
        <Card >
          <CardTitle tag="h6" className="p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Parties Involved
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>Role in case</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Plantiff</th>
                  <td>{caseInfo.nameOfPlantiff}</td>
                  <td>{caseInfo.emailOfPlantiff}</td>
                  <td>{caseInfo.addressOfPlantiff}</td>
                </tr>
                <tr>
                  <th scope="row">Defendant</th>
                  <td>{caseInfo.nameOfDefendant}</td>
                  <td>{caseInfo.emailOfDefendant}</td>
                  <td>{caseInfo.addressOfDefendant}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      <Col lg="12" style={{margin:"10px"}}>
        <Card>
          <CardTitle tag="h6" className="p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Lawyers
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>Role in case</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Verification Document</th>
                  <th>Vakalatnama Document</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Plantiff Lawyer</th>
                  <td>{caseInfo.nameOfPlantiffLawyer}</td>
                  <td>{caseInfo.emailOfPlantiffLawyer}</td>
                  <td><a href={caseInfo.verificationDocPlantiff}>Link to doc</a></td>
                  <td><a href = {caseInfo.vakalatDocPlantiff}>Link to doc</a></td>
                </tr>
                <tr>
                  <th scope="row">Defendant Lawyer</th>
                  <td>{caseInfo.nameOfDefendantLawyer}</td>
                  <td>{caseInfo.emailOfDefendantLawyer}</td>
                  <td><a href = {caseInfo.verificationDocDefendant}>Link to doc</a></td>
                  <td><a href={caseInfo.vakalatDocDefendant}>Link to doc</a></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
      <h1>Pass Judgement</h1>
      <div class="mb-3" >
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Judgement"></textarea>

          <button style = {{margin: "10px"}}type="button" className="btn btn-warning btn-lg ms-2 b2-color" >
                            Submit
            </button>
        </div>
        <h1>Session Info</h1>
        <div className="row">
          {sessions.map((ele, i)=>{
            return <div key={i} className="col-xl-6 col-sm-12 py-2">
                 <div className="ses-info" onClick={() => AboutSession(ele)}>
                        <h1><strong>EOD:</strong>  {ele.emailOfDefendant}</h1>
                        <p><strong>EODL:</strong> {ele.emailOfDefendantLawyer}</p>
                        <p><strong>EOJ:</strong> {ele.emailOfJudge}</p>
                        <p><strong>EOP:</strong> {ele.emailOfPlantiff}</p>
                        <p><strong>EOPL:</strong> {ele.emailOfPlantiffLawyer}</p>
                        <p><strong>Schedule:</strong>  {ele.scheduledDate}</p>
                        <p><strong>Session ID:</strong>  {ele._id}</p>
                        {ele.upcoming===false?(<p style={{color:'#FFAF33'}}>Previous Session</p>):
                        (
                          <button onClick={handleVideo} type="button" className="btn  btn-lg ms-2 b1-color" >
                                          Join
                          </button>)}
                        {/* <button onClick={Accept}>Accept</button>
                        <button onClick={Reject}>Reject</button> */}
                      </div>
             </div>
          })}    
      </div>
    </Row>
        </div>
    )
}

export default CaseInfoJudge;