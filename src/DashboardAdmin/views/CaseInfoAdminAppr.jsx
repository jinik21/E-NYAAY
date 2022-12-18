import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectTables from "../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import CaseInfo from "../../DashboardLawyer/views/CaseInfo";

const CaseInfoAdminAppr = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [caseInfo, setcaseInfo] = useState({});
  const [case_id, setCaseid] = useState("");
  const [sessions, setSessions] = useState([]);
  const [judgeEmail, setJE] = useState("");
  const [values, setValues] = useState({
    emailOfJudge: "",
    date: "",
    time: "",
  });
  useEffect(() => {
    const func = async () => {
      const caseid = location.state.id;
      const token = user.token;
      console.log(caseid);
      setCaseid(caseid);
      let data = await fetch(
        "http://localhost:3001/case/getById?id=" + caseid,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          },
        }
      );
      data = await data.json();
      console.log(data);
      setcaseInfo(data.cases);
      if (caseInfo.judge && caseInfo.emailOfJudge) {
        console.log(caseInfo);
        setJE(caseInfo.emailOfJudge);
      }
    };
    const func1 = async () => {
      const caseid = location.state.id;
      const token = user.token;
      console.log(caseid);
      let data1 = await fetch(
        "http://localhost:3001/sessions/get?caseId=" + caseid,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          },
        }
      );
      data1 = await data1.json();
      console.log(data1.sessions);
      setSessions((prev) => {
        return [...prev, ...data1.sessions];
      });
      console.log(sessions);
    };
    func();
    func1();
  }, []);

  const handleChange = (prop) => (event) => {
    console.log(event.target.value);
    setValues((prev) => {
      return { ...prev, [prop]: event.target.value };
    });
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    const token = user.token;
    try {
      fetch("http://localhost:3001/admin/assignJudge", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          caseId: case_id,
          judgeEmail: values.emailOfJudge,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          alert("Judge Assigned successfully");
        })
        .catch((e) => {
          console.log(e);
          alert(e.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleSchedule = async (e) => {
    e.preventDefault();
    const token = user.token;
    const [year, month, day] = values.date.split("-");
    const [hours, min] = values.time.split(":");
    const date = new Date(year, parseInt(month) - 1, day, hours, min);
    console.log(date);
    try {
      fetch("http://localhost:3001/admin/create/session", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emailOfJudge: caseInfo.emailOfJudge,
          emailOfPlantiff: caseInfo.emailOfPlantiff,
          emailOfDefendant: caseInfo.emailOfDefendant,
          emailOfPlantiffLawyer: caseInfo.emailOfPlantiffLawyer,
          emailOfDefendantLawyer: caseInfo.emailOfDefendantLawyer,
          caseId: caseInfo._id,
          scheduledDate: date,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          alert("Session Scheduled successfully");
        })
        .catch((e) => {
          console.log(e);
          alert(e.message);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const handleVideo = async (e) => {
    e.preventDefault();
    navigate("/call/" + case_id, {
      replace: false,
      state: {
        user: user,
        path: location.pathname,
      },
    });
  };
  const AboutSession = (ele) => {
    console.log(ele);
    navigate("/dashboardadmin/session-info", {
      state: {
        id: ele._id,
        emailOfPlantiff: ele.emailOfPlantiff,
        emailOfDefendant: ele.emailOfDefendant,
        emailOfPlantiffLawyer: ele.emailOfPlantiffLawyer,
        emailOfDefendantLawyer: ele.emailOfDefendantLawyer,
        emailOfJudge: ele.emailOfJudge,
        scheduledDate: ele.scheduledDate,
        upcoming: ele.upcoming,
        caseId: ele.caseId,
      },
    });
  };
  return (
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
                      <h6 className="mb-0">
                        {caseInfo && caseInfo.judge && caseInfo.emailOfJudge}
                      </h6>
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
        <Col lg="12" style={{ margin: "10px" }}>
          <Card>
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
        <Col lg="12" style={{ margin: "10px" }}>
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
                    <td>
                      <a href={caseInfo.verificationDocPlantiff}>Link to doc</a>
                    </td>
                    <td>
                      <a href={caseInfo.vakalatDocPlantiff}>Link to doc</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Defendant Lawyer</th>
                    <td>{caseInfo.nameOfDefendantLawyer}</td>
                    <td>{caseInfo.emailOfDefendantLawyer}</td>
                    <td>
                      <a href={caseInfo.verificationDocDefendant}>
                        Link to doc
                      </a>
                    </td>
                    <td>
                      <a href={caseInfo.vakalatDocDefendant}>Link to doc</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <div style={{ width: "100%" }}>
          <h5 className="mb-3">Assign Judge</h5>
          <Row>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email Of Judge
              </label>
              <input
                onChange={handleChange("emailOfJudge")}
                value={values.emailOfJudge}
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Email of Judge"
              />
            </div>
            <div className="col-md-6 mb-4">
              <div className="form-outline">
                <button
                  onClick={handleAssign}
                  type="button"
                  className="btn btn-warning btn-lg ms-2 b2-color"
                >
                  Assign
                </button>
              </div>
            </div>
          </Row>
        </div>
        <div className="col main pt-5 mt-3" style={{ width: "100%" }}>
          <h5 className="mb-3">Schedule Session</h5>
          <div className="col-md-6 mb-4">
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example9">
                Date of Session
              </label>
              <input
                type="date"
                id="form3Example9"
                className="form-control form-control-lg"
                name="date"
                value={values.date}
                onChange={handleChange("date")}
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="form-outline mb-4">
              <label for="inputMDEx1">Select Time Of Session</label>
              <input
                type="time"
                name="time"
                value={values.time}
                onChange={handleChange("time")}
                id="inputMDEx1"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <button
                onClick={handleSchedule}
                type="button"
                className="btn btn-warning btn-lg ms-2 b2-color"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
        <h1>Session Info</h1>
        <div className="row">
          {sessions.map((ele, i) => {
            return (
              <div key={i} className="col-xl-6 col-sm-12 py-2">
                <div className="ses-info" onClick={() => AboutSession(ele)}>
                  <h1>
                    <strong>EOD:</strong> {ele.emailOfDefendant}
                  </h1>
                  <p>
                    <strong>EODL:</strong> {ele.emailOfDefendantLawyer}
                  </p>
                  <p>
                    <strong>EOJ:</strong> {ele.emailOfJudge}
                  </p>
                  <p>
                    <strong>EOP:</strong> {ele.emailOfPlantiff}
                  </p>
                  <p>
                    <strong>EOPL:</strong> {ele.emailOfPlantiffLawyer}
                  </p>
                  <p>
                    <strong>Schedule:</strong> {ele.scheduledDate}
                  </p>
                  <p>
                    <strong>Session ID:</strong> {ele._id}
                  </p>
                  {ele.upcoming === false ? (
                    <p style={{ color: "#FFAF33" }}>Previous Session</p>
                  ) : (
                    <button
                      onClick={handleVideo}
                      type="button"
                      className="btn  btn-lg ms-2 b1-color"
                    >
                      Join
                    </button>
                  )}
                  {/* <button onClick={Accept}>Accept</button>
                        <button onClick={Reject}>Reject</button> */}
                </div>
              </div>
            );
          })}
        </div>
      </Row>
    </div>
  );
};

export default CaseInfoAdminAppr;
