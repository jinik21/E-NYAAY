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

const SubmitCase = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [values, setValues] = React.useState({
    nameOfPlantiff: "",
    emailOfPlantiff: "",
    emailOfDefendant: "",
    emailOfPlantiffLawyer: user.email,
    addressOfPlantiff: "",
    nameOfDefendant: "",
    addressOfDefendant: "",
    natureOfComplaint: "",
    summaryOfComplaint: "",
    feeAmount: "",
    vakalatDocPlantiff: "https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf",
    verificationDocPlantiff: "https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf"
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitForm = async(e)=>{
    setValues({ ...values, submitButtonDisable: true });
    e.preventDefault();
    const token = user.token
    try{
      fetch("http://localhost:3001/case/create",{
        method:"post",
        headers: { "Content-type": "application/json", "authorization": `Bearer ${token}` },
        body: JSON.stringify({
          nameOfPlantiff: values.nameOfPlantiff,
          emailOfPlantiff: values.emailOfPlantiff,
          emailOfDefendant: values.emailOfDefendant,
          emailOfPlantiffLawyer: values.emailOfPlantiffLawyer,
          addressOfPlantiff: values.addressOfPlantiff,
          nameOfDefendant:values.nameOfDefendant,
          addressOfDefendant:values.addressOfDefendant,
          natureOfComplaint: values.natureOfComplaint,
          summaryOfComplaint: values.summaryOfComplaint,
          feeAmount: values.feeAmount,
          vakalatDocPlantiff: values.vakalatDocPlantiff,
          verificationDocPlantiff: values.verificationDocPlantiff
        }),
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
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
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Submit Case
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="exampleText1">Name of Plaintiff</Label>
                <Input
                  id="exampleTex1"
                  name="plaintiffname"
                  placeholder="Name of Plaintiff"
                  type="text"
                  value={values.nameOfPlantiff}
                  onChange={handleChange("nameOfPlantiff")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleTex2">Address of Plaintiff</Label>
                <Input
                  id="exampleTex2"
                  name="plaintiffaddress"
                  placeholder="Address of Plaintiff"
                  type="text"
                  value = {values.addressOfPlantiff}
                  onChange={handleChange("addressOfPlantiff")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail1">Email of Plaintiff</Label>
                <Input
                  id="exampleEmail1"
                  name="plaintiffemail"
                  placeholder="Email of Plaintiff"
                  type="text"
                  value={values.emailOfPlantiff}
                  onChange={handleChange("emailOfPlantiff")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText3">Name of Defendant/Accused</Label>
                <Input
                  id="exampleTex3"
                  name="defendantname"
                  placeholder="Name of Defendant"
                  type="text"
                  value={values.nameOfDefendant}
                  onChange={handleChange("nameOfDefendant")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleTex4">Address of Defendant/Accused</Label>
                <Input
                  id="exampleTex4"
                  name="defendantaddress"
                  placeholder="Address of Defendant"
                  type="text"
                  value={values.addressOfDefendant}
                  onChange={handleChange("addressOfDefendant")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail2">Email of Defendant</Label>
                <Input
                  id="exampleEmail2"
                  name="defendantemail"
                  placeholder="Email of Defendant"
                  type="text"
                  value={values.emailOfDefendant}
                  onChange={handleChange("emailOfDefendant")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Nature of Complaint</Label>
                <Input id="exampleSelect" name="select" type="select" value={values.natureOfComplaint} onChange={handleChange("natureOfComplaint")}>
                  <option value="">Select type of Case</option>
                  <option value="Civil Case">Civil Case</option>
                  <option value="Criminal Case">Criminal Case</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleFeeView">View Fee According Case Type</Label>
                  <a style={{padding:"10%"}} href="https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf" target="_blank" >Fee Detail Link</a>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Summary of Complaint</Label>
                <Input id="exampleText" name="text" type="textarea" maxLength={200} value={values.summaryOfComplaint} onChange={handleChange("summaryOfComplaint")}/>
              </FormGroup>
              <FormGroup>
                <Label for="feeamount">Fee Amount</Label>
                <Input
                  id="feeamount"
                  name="feeamount"
                  placeholder="Fee amount calculated"
                  type="number"
                  value={values.feeAmount}
                  onChange={handleChange("feeAmount")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile1">Verification from Plaintiff</Label>
                <Input id="exampleFile1" name="file" type="file" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile2">Vakalatnama</Label>
                <Input id="exampleFile2" name="file" type="file" />
              </FormGroup>
              <Button disabled={values.submitButtonDisable} onClick={submitForm} type='submit'>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SubmitCase;
