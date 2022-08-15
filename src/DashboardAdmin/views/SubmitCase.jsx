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
  return (
    <Row style={{width:"250%"}}>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleTex2">Address of Plaintiff</Label>
                <Input
                  id="exampleTex2"
                  name="plaintiffaddress"
                  placeholder="Address of Plaintiff"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText3">Name of Defendant/Accused</Label>
                <Input
                  id="exampleTex3"
                  name="defendantname"
                  placeholder="Name of Defendant"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleTex4">Address of Defendant/Accused</Label>
                <Input
                  id="exampleTex4"
                  name="defendantaddress"
                  placeholder="Address of Defendant"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Nature of Complaint</Label>
                <Input id="exampleSelect" name="select" type="select">
                <option>Select type of Case</option>
                  <option>Civil Case</option>
                  <option>Criminal Case</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleFeeView">View Fee According Case Type</Label>
                  <a style={{padding:"10%"}} href="https://districts.ecourts.gov.in/sites/default/files/Court%20Fee_.pdf" target="_blank" >Fee Detail Link</a>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Summary of Complaint</Label>
                <Input id="exampleText" name="text" type="textarea" maxLength={200} />
              </FormGroup>
              <FormGroup>
                <Label for="feeamount">Fee Amount</Label>
                <Input
                  id="feeamount"
                  name="feeamount"
                  placeholder="Fee amount calculated"
                  type="number"
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
              <Button>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SubmitCase;
