import React, { useState, useEffect } from "react";
// import JsonData from "../../API_DATA.json";
import axios from "axios";

const Graph = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // Fetch method
    // fetch(JsonData)
    //   .then((response) => response.json())
    //   .then((result) => setGraphData(result));
    // console.log(JsonData)
    //axios
    axios.get(`/API_DATA.json`).then((result) => setGraphData(Object.values(result.data)));
  });
  return (
    <div>
      {/* {graphData && <p>{JSON.stringify(graphData, null, 2)}</p>} */}
      {graphData && graphData.map((res) => (
        <div key={res.name}>
            {res.Performance.TDP && <p>{res.Performance.TDP }</p>}
            {/* {res['Performance'].map((per, val) =>(
                <div key={per}>
                    {val[Cache]}
                </div>
            ) )} */}
        </div>
      ))}
    </div>
    // <div>
    //     {JSON.stringify(graphData[0])}
    // </div>
  );
};

export default Graph;
