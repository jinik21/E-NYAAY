import React from "react";
import { useEffect , useState} from "react";
import axios from "axios";
import { Row, Col, Table} from "reactstrap";

const Starter = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [cases,setCases] = useState([]);
  useEffect(() => {
    const func = async () => {
      const email = user.email;
      const token = user.token;
      console.log(token);
      console.log(email);
      const {data} = await axios.get("http://localhost:3001/case/get/"+email,{
        headers: {
          "authorization": `Bearer ${token}`,
        }
      })
      console.log(data);
      setCases((prev) => {
        return [...prev, ...data.cases]
      });
    };
    func();
  }, []);
  return (
    <div style={{width:"78vw"}}>
      <Row >
      <Col lg="12">
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Case Id</th>
                  <th>Name of Plantiff</th>
                  <th>Name of Defendant</th>
                  <th>Nature Of Complaint</th>
                  <th>Status of Case</th>
                </tr>
              </thead>
              <tbody>
              {cases.map((ele, i)=>{
                return(  
                  <tr>
                    <td>{ele._id}</td>
                    <td>{ele.nameOfPlantiff}</td>
                    <td>{ele.nameOfDefendant}</td>
                    <td>{ele.natureOfComplaint}</td>
                    {ele.status==="VERIFIED"?(<td style={{color:'green'}}>Accepted</td>):
                (ele.status==="REJECTED"?(<td style={{color:'red'}}>Rejected</td>):(<td style={{color:'#FFAF33'}}>Pending</td>))}
                  </tr>
              )})}
              </tbody>
            </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
