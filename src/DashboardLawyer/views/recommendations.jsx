import { Row, Col, Table } from "reactstrap";
import React from "react";
import { useEffect , useState} from "react";
import axios from "axios";
import { recommendationCase } from "../../utils/user";

const Recommendations = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [cases,setCases] = useState(recommendationCase);
  useEffect(() => {
    const func = async () => {
      const email = user.email;
      const token = user.token;
      console.log(token);
      console.log(email);
      const data = new FormData()
      data.append('data',"the appellant before u wa examined a prime witness in the trial of tr on the file of the special judge against the first respondent the trial ended in conviction against the first respondent and when the appeal filed by him came to be heard by the high court the appellant had become a cabinet minister on account of the disparaging remark made by the appellate judge the appellant tendered his resignation and demitted office for maintaining democratic tradition it is in that backgroud this appeal ha come to be preferred pursuant to a trap laid by the vigilance police on the complaint of the appellant manager p1 pw2 the first respondent wa arrested on 26479 for having accepted a bribe of r 2000 from p1 the marked currency note were recovered from the brief case of the first respondent prior to the arrest the prosecution case wa that the first respondent had been extracting illegal gratification at the rate of r 1000 er month during the month of january february and march 1979 from p1 but all of a sudden he raised the demand to r 2000 per month in april 1979 and this led to p1 laying information exhibit i before the superintendent of police vigilance acting on the report a trap wa laid on 26479 and after p1 had handed over the marked currency note the vigilance party entered the office and recovered the currency note from the brief case and arrested the first respondent the first respondent denied having received any illegal gratification but offered no explanation for the presence of the currency note in his brief case eleven witness including the appellant who figured a pw8 were examined by the prosecution and the first respondent examined three witness dws 1 to 3 to substantiate the defence set up by him viz that the sum of r 2000 had been paid by way of donation for conducting a drama and publishing a souvenir by the mining officer club and also towards donation for childrens welfare fundthe special judge accepted the prosecution case and held the first respondent guilty the special judge awarded a sentence of rigorous imprisonment for one year for the conviction under the first charge but did not award any separate sentence for the conviction under the second against the conviction and sentence the first respondent appealed to the high court a learned judge of the high court ha allowed the appeal holding that the prosecution ha not proved it case by acceptable evidence and besides the first respondent explanation for the possession of the currency note appeared probable while acquitting the first respondent the learned judge ha however made several adverse remark about the conduct of the appellant and about the credibility of his testimony and it is with that part of the judgment we are now concerned with in this appeal")
      axios.post('https://enyaayml.loophole.site/getcase', data)
      .then(res => {
    //     setPredictions(res.data.results)
    //   seturl(res.data.url)
      console.log(res)
      console.log(res.data.url)
      })
      .catch(err => console.log(err));
    }
    func();
  }, []);
  return (
    <div style={{width:"100%"}}>
      <h5 className="mb-3">Case Recommendations</h5>
      <Row >
      <Col lg="12">
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Data</th>
                  <th>Similarity</th>
                </tr>
              </thead>
              <tbody>
              {cases.map((ele, i)=>{
                return(  
                  <tr>
                    <td>{ele.filename}</td>
                    <td>{ele.data}</td>
                    <td>{ele.similarity}</td>
                  </tr>
              )})}
              </tbody>
            </Table>
        </Col>
      </Row>
  </div>
  );
};

export default Recommendations;
