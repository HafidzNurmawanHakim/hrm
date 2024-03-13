import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = () => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },

      events: {
        //   click: function(chart, w, e) {
        //     // console.log(chart, w, e)
        //   }
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "25%",
        distributed: true,
        borderRadius: 7,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["Frontend", "Backend", "UI/UX", "Qa Tester"],
      labels: {
        show: true,
        style: {
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
        color: "transparent",
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false, // you can either change hear to disable all grids
      xaxis: {
        lines: {
          show: false, //or just here to disable only x axis grids
        },
      },
      yaxis: {
        lines: {
          show: false, //or just here to disable only y axis
        },
      },
    },
  };

  const series = [
    {
      data: [21, 32, 10, 15],
    },
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={165}
          width={320}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ColumnChart;
