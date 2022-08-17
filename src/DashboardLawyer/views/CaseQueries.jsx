import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";

const CaseQueries = () => {
  return (
    <div style={{width:"100%"}}>
      <h5 className="mb-3">Raise a Query</h5>
      <Row>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Subject of Query</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Subject" />
        </div>
        <div class="mb-3" >
          <label for="exampleFormControlTextarea1" class="form-label">Ask Admin</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description"></textarea>
        </div>
        <div className="col-md-6 mb-4">
          <div className="form-outline">
            <button type="button" className="btn btn-warning btn-lg ms-2 b2-color" >
                            Submit
            </button>
          </div>
        </div>
      </Row>
  </div>
  );
};

export default CaseQueries;
