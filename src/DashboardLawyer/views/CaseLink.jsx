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
                    name="caseuid"
                    placeholder="Case Unique ID"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile1">Verification from Defendant</Label>
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
  
  export default CaseLink;
  