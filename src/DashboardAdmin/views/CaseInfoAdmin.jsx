import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

const CaseInfoAdmin = () => {
    const location = useLocation();
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
          func();
    }, []);
    const handleApprove = async(e)=>{
        e.preventDefault();
        const token = user.token
        try{
          fetch("http://localhost:3001/admin/approve",{
            method:"post",
            headers: { "Content-type": "application/json", "authorization": `Bearer ${token}` },
            body: JSON.stringify({
              caseId: case_id,
            }),
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            alert("case Approved successfully");
          }).catch((e) => {
            console.log(e);
            alert(e.message);
          })
        } catch (e) {
          console.log(e);
        }
      }
      const handleReject = async(e)=>{
        e.preventDefault();
        const token = user.token
        try{
          fetch("http://localhost:3001/admin/reject",{
            method:"post",
            headers: { "Content-type": "application/json", "authorization": `Bearer ${token}` },
            body: JSON.stringify({
              caseId: case_id,
            }),
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            alert("case Rejected successfully");
          }).catch((e) => {
            console.log(e);
            alert(e.message);
          })
        } catch (e) {
          console.log(e);
        }
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
      <div className="col-md-6 mb-4">
          <div className="form-outline">
            <button onClick={handleApprove} type="button" className="btn btn-success btn-lg ms-2 b2-color" >
                            Approve Case
            </button>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="form-outline">
            <button onClick={handleReject} type="button" className="btn btn-danger btn-lg ms-2 b2-color" >
                            Reject Case
            </button>
          </div>
        </div>
    </Row>
        </div>
    )
}

export default CaseInfoAdmin;