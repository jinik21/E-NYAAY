import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import ProjectTables from "../components/dashboard/ProjectTable";

const CaseQueries = () => {
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

export default CaseQueries;
