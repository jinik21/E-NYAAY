import React from "react";
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
  } from "reactstrap";
  import firebase from "../../firebase";

  var storageRef = firebase.storage().ref();
const toBlob = (file) => {
  return new Blob([file], {
    type: "application/pdf",
  });
};
var metadata = {
  contentType: "application/pdf",
};
  
  const CaseLink = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [selectedFile,setFile] = React.useState(null);
    const [data,setData] = React.useState("");
    const [selectedFile1,setFile1] = React.useState(null);
    const [data1,setData1] = React.useState("");
    const [values, setValues] = React.useState({
        caseId:"",
        emailOfDefendantLawyer: user.email,
        vakalatDocDefendant: "https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf",
        verificationDocDefendant: "https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf"
      });
      const onFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
      };
      const onFileUpload = async () => {
        const formData = new FormData();
        if (selectedFile == null) {
          alert("No file Selected!!!");
        } else {
          formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
          );
          console.log(selectedFile);
          try {
            const blob = toBlob(selectedFile);
            console.log(blob);
            var mountainsRef = await storageRef.child(selectedFile.name);
            await mountainsRef.put(blob, metadata);
            const res = await mountainsRef.getDownloadURL();
            console.log(res);
            setData(res);
          } catch (e) {
            console.log(e);
          }
        }
      };
      const onFile1 = (e) => {
        console.log(e.target.files[0]);
        setFile1(e.target.files[0]);
      };
      const onFileUpload1 = async () => {
        const formData = new FormData();
        if (selectedFile1 == null) {
          alert("No file Selected!!!");
        } else {
          formData.append(
            "myFile",
            selectedFile1,
            selectedFile1.name
          );
          console.log(selectedFile1);
          try {
            const blob = toBlob(selectedFile1);
            console.log(blob);
            var mountainsRef = await storageRef.child(selectedFile1.name);
            await mountainsRef.put(blob, metadata);
            const res1 = await mountainsRef.getDownloadURL();
            console.log(res1);
            setData1(res1);
          } catch (e) {
            console.log(e);
          }
        }
      };
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const submitForm = async(e)=>{
        setValues({ ...values, submitButtonDisable: true });
        e.preventDefault();
        const token = user.token
        try{
          fetch("http://localhost:3001/case/link",{
            method:"post",
            headers: { "Content-type": "application/json", "authorization": `Bearer ${token}` },
            body: JSON.stringify({
              caseId: values.caseId,
              emailOfDefendantLawyer: values.emailOfDefendantLawyer,
              vakalatDocDefendant: data1,
              verificationDocDefendant: data
            }),
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            alert("case linked successfully");
          }).catch((e) => {
            console.log(e);
            alert(e.message);
          })
        } catch (e) {
          console.log(e);
        }
      }
    return (
      <Row style={{width:"250%"}}>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Link Case
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleuid1">Case Unique ID</Label>
                  <Input
                    id="exampleuid1"
                    name="caseId"
                    placeholder="Case Unique ID"
                    type="text"
                    value={values.caseId}
                    onChange={handleChange("caseId")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile1">Verification from Defendant</Label>
                  <Input id="exampleFile1" name="verificationDocDefendant" type="file" onChange={onFile} />
                  <div style ={{margin:"10px"}}className="col-md-6 mb-4">
                  <div className="form-outline">
                    <button type="button"
                            className="btn btn-warning btn-sm ms-2 b2-color"
                            onClick={onFileUpload}
                          >
                            Upload
                    </button>
                  </div>
                </div>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile2">Vakalatnama</Label>
                  <Input id="exampleFile2" name="vakalatDocDefendant" type="file" onChange={onFile1} />
                  <div style ={{margin:"10px"}}className="col-md-6 mb-4">
                  <div className="form-outline">
                    <button type="button"
                            className="btn btn-warning btn-sm ms-2 b2-color"
                            onClick={onFileUpload1}
                          >
                            Upload
                    </button>
                  </div>
                </div>
                </FormGroup>
                <Button onClick={submitForm} type='submit'>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default CaseLink;
  