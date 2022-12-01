import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import moibit from "../../config/axios";
import {
  encryptWithPublicKey,
  decryptWithPrivateKey,
  cipher,
  hash,
} from "eth-crypto";

const CaseInfo = () => {
  const location = useLocation();
  const [encryptedFileString, setEncryptedFileString] = useState("");
  const [evidences, setEvidences] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [caseInfo, setcaseInfo] = useState({});
  const [sessions, setSessions] = useState([]);
  const [case_id, setCaseid] = useState("");
  const [isPlantifLawyer, setPlantifLawyer] = useState(null);
  const navigate = useNavigate();
  const pubKey =
    "68b29ea4ef0d39bc5e02d3c685846154ba768b195eb67a8ec15773a9190b4248435c3f2c4ecde74be4f5d82548a3f738074dc3d09537240485430e47d04f2585";
  const privateKey =
    "0x8b3cfe427461256c53fa8d12b5fe71de36864d1c1b8f8834d565d5a1a079a948";
  useEffect(() => {
    const func = async () => {
      console.log(location.pathname);
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
      console.log(caseInfo);
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
  useEffect(() => {
    const func = async () => {
      const promiseArray = [];
      const { data } = await moibit.post("/listfiles", {
        path: "/",
      });
      data.data.map((ele) => {
        const promise = moibit.post("/readfile", {
          fileName: ele.path,
          version: ele.version,
        });
        promiseArray.push(promise);
      });
      const val = await Promise.all(promiseArray);
      const imagesArray = [];
      val.map((ele) => {
        imagesArray.push(ele.data);
      });
      setEvidences(imagesArray);
    };
    func();
  }, []);
  const uploadFile = async () => {
    if (isPlantifLawyer !== null) {
      let formData = new FormData();
      const string = JSON.stringify(encryptedFileString);
      const blob = new Blob([string], { type: "text/plain" });
      const file = new File([blob], "file", { type: "text/plain" });
      formData.append("file", file);
      console.log(isPlantifLawyer);
      formData.append(
        "fileName",
        location.state.id + "-" + (isPlantifLawyer ? "plantiff" : "defendant")
      );

      const { data } = await moibit.post("/writefile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    }
  };
  const convertBase64toBlob = (content, contentType) => {
    contentType = contentType || "";
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType,
    });
    return blob;
  };
  const downloadBlob = (blob) => {
    const url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.style = "display:none";
    a.download = "downloadedFile";
    a.click();
  };
  const encryptData = (publicKey, message) => {
    return encryptWithPublicKey(publicKey, JSON.stringify(message));
  };
  const decryptData = (privateKey, encryptedMessage) => {
    return decryptWithPrivateKey(privateKey, encryptedMessage);
  };
  const clickOnEvidence = (data) => {
    const encryptedObject = cipher.parse(data);
    decryptData(privateKey, encryptedObject).then((data) => {
      console.log(data);
      const blob = convertBase64toBlob(JSON.parse(data), "image/png");
      console.log(blob);
      downloadBlob(blob);
    });
  };
  const readFile = (e) => {
    const file = e.target.files[0];
    const type = file.type;
    console.log(type);
    var reader = new FileReader();
    reader.onload = (e) => {
      const base64data = window.btoa(e.target.result);
      console.log("Base 64 string: ", base64data);
      encryptData(pubKey, base64data).then((encoded) => {
        const encryptString = cipher.stringify(encoded);
        setEncryptedFileString(encryptString);
      });
    };
    reader.readAsBinaryString(file);
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
    navigate("/dashboardlawyer/session-info", {
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
                        {caseInfo && caseInfo.judge && caseInfo.judge.email}
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
                      style={{zIndex: 100}}
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
        <div className="col-md-6 mb-4">
          <h3>Upload Evidence</h3>
          <div className="form-outline">
            <label
              style={{
                border: "1px solid #ccc",
                display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
                background: "orange",
                height: "40px",
              }}
            >
              <input type="file" onChange={(e) => readFile(e)} required />
              Upload Evidence
            </label>
            {encryptedFileString && (
              <button
                onClick={() => uploadFile()}
                type="button"
                className="btn btn-warning btn-lg ms-2 b2-color"
              >
                Upload Evidence
              </button>
            )}
          </div>
        </div>
        <Col lg="12" style={{ margin: "10px" }}>
          <Card>
            <CardTitle tag="h6" className="p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Evidences
            </CardTitle>
            <CardBody className="">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Role in case</th>
                    <th>Evidences Document</th>
                  </tr>
                </thead>
                <tbody>
                  {evidences.map((ele, idx) => {
                    return (
                      <tr>
                        <th scope="row">{idx + 1}</th>
                        <td>
                          <a href="#" onClick={() => clickOnEvidence(ele)}>
                            Link to doc
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CaseInfo;
