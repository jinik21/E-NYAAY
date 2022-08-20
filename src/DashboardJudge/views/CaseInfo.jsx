import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";

const CaseInfo = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const [caseInfo, setcaseInfo] = useState({});
    useEffect(() => {
        const func = async () => {
            const caseid=location.state.id;
            const token = user.token;
            console.log(caseid);
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
        </div>
    )
}

export default CaseInfo;