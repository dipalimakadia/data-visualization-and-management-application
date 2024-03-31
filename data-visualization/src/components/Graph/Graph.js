import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Graph = ({data}) => {
  const [graphData, setGraphData] = useState([]);
  const tdp = Object.keys(graphData).map((val) =>
    parseFloat(graphData[val]?.Performance?.TDP)
  );
  const cores = Object.keys(graphData).map((val) =>
    parseFloat(graphData[val]?.Performance?.["# of Cores"])
  );

  let launched = 0;
  let discontinued = 0;
  let announced = 0;
  for (const val in graphData) {
    if (graphData[val]?.["Essentials"]?.["Status"] === "Launched") {
      launched++;
    } else if (graphData[val]?.["Essentials"]?.["Status"] === "Discontinued") {
      discontinued++;
    } else if (graphData[val]?.["Essentials"]?.["Status"] === "Announced") {
      announced++;
    }
  }

  // let count32Bit = 0;
  // let count64Bit = 0;
  // Object.keys(graphData).map((val) => {
  //   if (
  //     graphData[val]?.["Advanced Technologies"]?.["Instruction Set"] ===
  //     "32-bit"
  //   ) {
  //     count32Bit++;
  //   } else if (
  //     graphData[val]?.["Advanced Technologies"]?.["Instruction Set"] ===
  //     "64-bit"
  //   ) {
  //     count64Bit++;
  //   }
  // });

  useEffect(() => {
    // axios
    //   .get(`/API_DATA.json`)
    //   .then((result) => setGraphData(Object.values(result.data)));
      setGraphData(data)
  }, [data]);

  const baroptions = {
    chart: {
      backgroundColor: "#1C1C1C",
      type: "column",
    },
    title: {
      text: "Cores and TDP of every chip",
      style: {
        color: "white",
        fontSize: "20px",
      },
    },
    xAxis: {
      categories: graphData.map((res) => res.name),
      labels: {
        style: {
          color: "white",
        },
      },
    },
    yAxis: {
      max: 400,
      labels: {
        style: {
          color: "white",
        },
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      borderWidth: 1,
      backgroundColor: "#ffffff",
      shadow: true,
    },

    series: [
      {
        name: "TDP",
        data: tdp,
        tooltip: {
          valueSuffix: " W",
        },
        color: "#EFC030",
      },
      {
        name: "# of Cores",
        data: cores,
        tooltip: {
          valueSuffix: "",
        },
        color: "#0044FC",
      },
    ],
  };

  // const pieeoptions = {
  //   chart: {
  //     backgroundColor: "#1C1C1C",
  // color:"white",
  //     type: "pie",
  //   },
  //   title: {
  //     text: "No. of processors with Instruction Set of 64-bit and 32-bit",
  // style: {
  //   color: "white",
  // fontSize:'30px',
  // },
  //   },
  //   plotOptions: {
  //     pie: {
  //       cursor: "pointer",
  //       dataLabels: {
  //         enabled: true,
  //       },
  //     },
  //   },
  //   series: [
  //     {
  //       name: "No. of Processors: ",
  //       data: [
  //         {
  //           name: "32-bit",
  //           y: count32Bit,
  //         },
  //         {
  //           name: "64-bit",
  //           y: count64Bit,
  //         },
  //       ],
  //     },
  //   ],
  // };

  const pieoptions = {
    chart: {
      backgroundColor: "#1C1C1C",
      color: "white",
      type: "pie",
    },
    title: {
      text: "No. of Essentials Status",
      style: {
        color: "white",
        fontSize: "20px",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format:
            '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
            '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
        },
      },
    },

    series: [
      {
        name: "Status: ",
        data: [
          {
            name: "Launched",
            y: launched,
            color: "#AF4DFF",
          },

          {
            name: "Discontinued",
            y: discontinued,
            color: "#00D47C",
          },
          {
            name: "Announced",
            y: announced,
            color: "#FF6858",
          },
        ],
      },
    ],
  };

  return (
    <div className="container-fluid graphPage bg-blackShade">
      <div className="row justify-content-center m-5">
        <h2 className="font-400">Data in Graphs</h2>
      </div>
      <div className="row py-3 my-3">
        <HighchartsReact highcharts={Highcharts} options={baroptions} />
      </div>
      <div className="row py-3">
        <HighchartsReact
          className="col-md-12 col-lg-4"
          highcharts={Highcharts}
          options={pieoptions}
        />
        {/* <div className="col-md-12 col-lg-6">
          <HighchartsReact
            className="col-md-12 col-lg-4"
            highcharts={Highcharts}
            options={pieeoptions}
          />
        </div>
        <div className="col-md-12 col-lg-6">
          <HighchartsReact
            className="col-md-12 col-lg-4"
            highcharts={Highcharts}
            options={pieoptions}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Graph;
