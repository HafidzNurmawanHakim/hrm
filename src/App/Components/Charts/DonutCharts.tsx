import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutCharts = () => {
  const options: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            fontSize: "12px",
          },
        },
        track: {
          strokeWidth: "97%",
        },
      },
    },

    labels: ["Design UI"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: false,
    },
  };

  const series = [44];

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={160}
          width={160}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutCharts;
