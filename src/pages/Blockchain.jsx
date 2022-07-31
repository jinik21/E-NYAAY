import React, { useEffect } from "react";
import factory from "../ethereum/factory";

function Blockchain() {
  useEffect(() => {
    const fetchData = async () => {
      const data = factory.methods.getCasesCount().call();
      console.log(data);
    };
    fetchData();
  }, []);
  return <div>blockchain</div>;
}

export default Blockchain;
