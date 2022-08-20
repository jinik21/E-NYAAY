import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import ProjectTables from "../components/dashboard/ProjectTable";

const About = () => {
  return (
    <div>
    <Row>
    <Col lg="12">
          <ProjectTables />
        </Col>
    </Row>
  </div>
  );
};

export default About;
