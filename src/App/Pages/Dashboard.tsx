import React, { ReactNode } from "react";
import SidePanel from "../Components/SidePanel";
import CustomTable, { Column } from "../Core/CustomTable";
import CustomTableCell from "../Components/Atoms/CustomTableCell";
import NextTable from "../Components/NextTable/Table";
import { users } from "../../Assets/data";
import { useAppController } from "../Core/AppController";
import ApexCharts from "../Components/Charts/ApexCharts";

type Data = {
	key: string;
	name: string;
	role: string;
	status: string;
};

const Dashboard = () => {
	const columns: Column[] = [
		{
			name: "ID",
			key: "id",
			sortable: true,
			render: (item, columnKey) => (
				<CustomTableCell item={item} columnKey={columnKey} />
			),
		},
		{ name: "NAME", key: "name", sortable: true },
		{ name: "AGE", key: "age", sortable: true },
		{ name: "ROLE", key: "role", sortable: true },
		{ name: "TEAM", key: "team" },
		{ name: "EMAIL", key: "email" },
		{ name: "STATUS", key: "status", sortable: true },
		{ name: "ACTIONS", key: "actions" },
	];

	return (
		<div className="w-full h-full p-2">
			<div className="grid grid-rows-4 grid-cols-6 grid-flow-col gap-2">
				<div className="row-span-2 col-span-4 pb-0">
					<div className="flex">
						<div className="w-52">
							<h1 className="text-2xl">Productivity</h1>
						</div>
						<div className="flex-auto">
							<ApexCharts />
						</div>
					</div>
				</div>
				<div className="row-span-2 col-span-4">
					<CustomTable data={users} columns={columns} />
				</div>
				<div className="row-span-full col-span-6 bg-danger">test</div>
			</div>
		</div>
	);
};

{
	/* <CustomTable data={users} columns={columns} /> */
}

export default Dashboard;
