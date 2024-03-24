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

  let count32Bit = 0;
  let count64Bit = 0;
  Object.keys(graphData).map((val) => {
    if (
      graphData[val]?.["Advanced Technologies"]?.["Instruction Set"] ===
      "32-bit"
    ) {
      count32Bit++;
    } else if (
      graphData[val]?.["Advanced Technologies"]?.["Instruction Set"] ===
      "64-bit"
    ) {
      count64Bit++;
    }
  });

  useEffect(() => {
    axios
      .get(`/API_DATA.json`)
      .then((result) => setGraphData(Object.values(result.data)));
  }, []);

  const baroptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Data:: # of Cores and TDP of every chip",
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
      series: {
        pointPadding: 0,
        groupPadding: 0.1,
        borderWidth: 0,
        shadow: false,
      },
    },
    legend: {
      borderWidth: 1,
      backgroundColor: "#ffffff",
      shadow: true,
    },
    credits: {
      enabled: false,
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

  const pieoptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Data:: No. of processors with Instruction Set of 64-bit and 32-bit",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        cursor: "pointer",
        allowPointSelect: true,
        borderWidth: 0,
        shadow: false,
        colorByPoint: true,
        style: {
          fontSize: "1.2em",
          textOutline: "none",
          opacity: 0.7,
        },
      },
    },
    legend: {
      borderWidth: 1,
      backgroundColor: "#ffffff",
      shadow: true,
    },
    credits: {
      enabled: false,
    },

    series: [
      {
        name: "No. of Processors: ",
        data: [
          {
            name: "32-bit",
            y: count32Bit,
          },
          {
            name: "64-bit",
            y: count64Bit,
          },
        ],
      },
    ],
  };

  const pieeoptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Data:: No. of processors with Instruction Set of 64-bit and 32-bit",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        cursor: "pointer",
        allowPointSelect: true,
        borderWidth: 0,
        shadow: false,
        colorByPoint: true,
        style: {
          fontSize: "1.2em",
          textOutline: "none",
          opacity: 0.7,
        },
      },
    },
    legend: {
      borderWidth: 1,
      backgroundColor: "#ffffff",
      shadow: true,
    },
    credits: {
      enabled: false,
    },

    series: [
      {
        name: "No. of Processors: ",
        data: [
          {
            name: "Announced",
            y: announced,
          },
          {
            name: "Launched",
            y: launched,
          },
          {
            name: "Discontinued",
            y: discontinued,
          },
        ],
      },
    ],
  };

  return (
    <div className="hello">
      <HighchartsReact highcharts={Highcharts} options={baroptions} />
      <HighchartsReact highcharts={Highcharts} options={pieoptions} />
      <HighchartsReact highcharts={Highcharts} options={pieeoptions} />
    </div>
  );
};

export default Graph;
