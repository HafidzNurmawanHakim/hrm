import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
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
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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

  const series: ApexAxisChartSeries = [
    {
      name: "Task Cleared",
      data: [30, 40, 25, 50, 49, 21, 70],
    },
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={168}
          width={320}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChart;
