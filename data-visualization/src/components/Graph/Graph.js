import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Graph = () => {
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
    axios
      .get(`/API_DATA.json`)
      .then((result) => setGraphData(Object.values(result.data)));
  }, []);

  const baroptions = {
    chart: {
      backgroundColor: "#D3D3D3",
      type: "column",
    },
    title: {
      text: "Cores and TDP of every chip",
    },
    xAxis: {
      categories: graphData.map((res) => res.name),
    },
    yAxis: {
      max: 400,
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
      },
      {
        name: "# of Cores",
        data: cores,
        tooltip: {
          valueSuffix: "",
        },
      },
    ],
  };

  // const pieeoptions = {
  //   chart: {
  //     backgroundColor: "#D3D3D3",
  //     type: "pie",
  //   },
  //   title: {
  //     text: "No. of processors with Instruction Set of 64-bit and 32-bit",
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
      backgroundColor: "#D3D3D3",
      type: "pie",
    },
    title: {
      text: "No. of Essentials Status",
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
          },

          {
            name: "Discontinued",
            y: discontinued,
          },
          {
            name: "Announced",
            y: announced,
          },
        ],
      },
    ],
  };

  return (
    <div className="graphPage container-fluid">
      <div className="row">
        <HighchartsReact highcharts={Highcharts} options={baroptions} />
      </div>
      <div className="row">
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
