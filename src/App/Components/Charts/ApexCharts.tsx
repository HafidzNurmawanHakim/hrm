import { Button } from "@nextui-org/react";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useAppController } from "../../Core/AppController";

const ApexCharts = () => {
	const { holdOn, showPanel } = useAppController();
	const [width, setWidth] = useState("100%");
	useEffect(() => {
		setWidth("100%");
	}, [holdOn, showPanel]);
	const options: ApexOptions = {
		xaxis: {
			categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yaxis: {
			labels: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		legend: { show: false },
		chart: {
			toolbar: {
				show: false,
			},
			height: "100%",
			offsetY: 0,
			sparkline: {
				enabled: false,
			},
			redrawOnParentResize: true,
			redrawOnWindowResize: true,
			events: {
				animationEnd: (chart) => {
					return chart.parentResizeHandler();
				},
			},
			animations: {
				enabled: true,
				easing: "easeinout",
			},
		},

		grid: {
			show: true, // you can either change hear to disable all grids
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
			name: "series-1",
			data: [30, 40, 25, 50, 49, 21, 70, 51],
		},
		{
			name: "series-2",
			data: [23, 12, 54, 61, 32, 56, 81, 19],
		},
		{
			name: "series-3",
			data: [24, 20, 5, 75, 42, 79, 72, 35],
		},
	];
	return (
		<div className="">
			<Button isIconOnly></Button>
			<Chart
				type="area"
				options={options}
				series={series}
				height={300}
				width={width}
			/>
		</div>
	);
};

export default ApexCharts;
