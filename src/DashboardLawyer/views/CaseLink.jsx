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
  
  const CaseLink = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [values, setValues] = React.useState({
        caseId:"",
        emailOfDefendantLawyer: user.email,
        vakalatDocDefendant: "https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf",
        verificationDocDefendant: "https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf"
      });
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
              vakalatDocDefendant: values.vakalatDocDefendant,
              verificationDocDefendant: values.verificationDocDefendant
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
                  <Input id="exampleFile1" name="verificationDocDefendant" type="file"  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile2">Vakalatnama</Label>
                  <Input id="exampleFile2" name="vakalatDocDefendant" type="file" />
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
  