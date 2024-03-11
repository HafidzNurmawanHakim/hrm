import React, { ReactNode, useState } from "react";
import CustomTable, { Column } from "../Core/CustomTable";
import CustomTableCell from "../Components/Atoms/CustomTableCell";
import NextTable from "../Components/NextTable/Table";
import ApexCharts from "../Components/Charts/ApexCharts";
import { ProjectStats } from "../Components/Atoms/ProjectStats";
import PrecentageUp from "../Components/Atoms/PrecentageUp";
import ChartStatIcon from "../../Assets/Icons/ChartStatsIcon";
import MiniCard from "../Components/Atoms/MiniCard";
import InboxStackIcon from "../../Assets/Icons/InboxStack";
import ClipBoardTask from "../../Assets/Icons/ClipBoardTaskIcon";
import TwoUsersIcon from "../../Assets/Icons/TwoUsersIcon";
import CalendarIcon from "../../Assets/Icons/CalendarIcons";
import { DayEn, statusColorMap } from "../Library/_types/General";
import { getCurrentDateIndonesianFormat } from "../Library/utils/helper";
import CustomActionCell from "../Components/Atoms/CustomActionCell";
import CustomUserTableCell from "../Components/Atoms/CustomUserTableCell";
import { Chip } from "@nextui-org/react";
import "react-vertical-timeline-component/style.min.css";
import VerticalAccor from "../Components/VerticalAccor/VerticalAccor";

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
    {
      name: "NAME",
      key: "name",
      sortable: true,
      render: (item, columnKey) => (
        <CustomUserTableCell item={item} columnKey={columnKey} />
      ),
    },
    { name: "AGE", key: "age", sortable: true },
    {
      name: "ROLE",
      key: "role",
      sortable: true,
      render: (item, columnKey) => (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {item[columnKey as string]}
          </p>
          <p className="text-bold text-tiny capitalize text-default-500">
            {item.team}
          </p>
        </div>
      ),
    },
    { name: "TEAM", key: "team" },
    { name: "EMAIL", key: "email" },
    {
      name: "STATUS",
      key: "status",
      sortable: true,
      render: (item, columnKey) => (
        <Chip
          className="capitalize gap-1"
          color={statusColorMap[item.status]}
          size="sm"
          variant="bordered"
        >
          {item[columnKey as string]}
        </Chip>
      ),
    },
    {
      name: "ACTIONS",
      key: "actions",
      render: (item, columnKey) => (
        <CustomActionCell item={item} columnKey={columnKey} />
      ),
    },
  ];

  return (
    <div className="w-full h-full p-2">
      <div className="grid grid-rows-8 grid-cols-6 grid-flow-col gap-2">
        <div className="row-span-3  col-span-4 pb-0">
          <div className="flex gap-2">
            <div className="w-60 flex flex-col 3xl:w-72">
              <MiniCard
                desc={getCurrentDateIndonesianFormat()}
                icon={<CalendarIcon className="text-secondary text-3xl" />}
                type="date"
                day={DayEn[new Date().getDay()]}
              />
              <MiniCard
                desc="28 Total Projects Running"
                icon={<InboxStackIcon className="text-secondary text-3xl" />}
              />
              <MiniCard
                desc="312 Total Tasks"
                icon={<ClipBoardTask className="text-secondary text-3xl" />}
              />
              <MiniCard
                desc="96 Active Employees"
                icon={<TwoUsersIcon className="text-secondary text-3xl" />}
              />
            </div>
            <div className="flex-auto rounded-xl bg-white">
              <ApexCharts title="Task Improvement" />
            </div>
          </div>
        </div>
        <div className="row-span-5 col-span-4">
          <VerticalAccor title="Recent Activity" />
          {/* <NextTable /> */}
          {/* <CustomTable data={users} columns={columns} title="Recent Activity" /> */}
        </div>
        <div className="row-span-full col-span-2 px-2">
          <div className="flex flex-col gap-4">
            <ProjectStats
              title="HRM Web App"
              bottomContent={() => (
                <PrecentageUp precentage="67.81%" desc="Since last week" />
              )}
              icon={<ChartStatIcon className="text-4xl" />}
              type="success"
              status="Completed"
              summary={240}
            />
            {/* <ProjectStats
              label="Team Status"
              bottomContent={() => (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-fit">
                    <AvatarGroups width="6" max={4} />
                  </div>
                  <p className="text-sm text-warning">
                    Andrew and others are sick and paid leave
                  </p>
                </div>
              )}
              icon={<UserMinusIcon className="text-4xl" />}
              type="success"
              status="Staff Active"
              summary={69}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <CustomTable data={users} columns={columns} /> */
}

export default Dashboard;
