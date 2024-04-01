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
import {
  BaseColor,
  DayEn,
  Priority,
  statusColorMap,
} from "../Library/_types/General";
import { getCurrentDateIndonesianFormat } from "../Library/utils/helper";
import CustomActionCell from "../Components/Atoms/CustomActionCell";
import CustomUserTableCell from "../Components/Atoms/CustomUserTableCell";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import VerticalAccor from "../Components/VerticalAccor/VerticalAccor";
import { InfoCircle } from "iconsax-react";
import TaskReminder from "../Components/Atoms/TaskReminder";

type Data = {
  key: string;
  name: string;
  role: string;
  status: string;
};

const taskReminder = [
  {
    taskTitle: "Design Calendar",
    hour: "09:00 AM",
    baseColor: "danger",
    taskDesc: "Create a new design for the upcoming calendar.",
    priority: "high" as Priority, // Contoh penggunaan tipe Priority
  },
  {
    taskTitle: "Review Meeting Agenda",
    hour: "11:30 AM",
    baseColor: "warning",
    taskDesc: "Review and finalize the agenda for the team meeting.",
    priority: "medium" as Priority, // Contoh penggunaan tipe Priority
  },
  {
    taskTitle: "Prepare Presentation",
    hour: "02:00 PM",
    baseColor: "violet",
    taskDesc:
      "Gather materials and prepare slides for tomorrow's presentation.",
    priority: "low" as Priority, // Contoh penggunaan tipe Priority
  },
];

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
        <div className="row-span-3 col-span-4 pb-0 md:col-span-6 lg:col-span-4">
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
            <div className="flex-auto rounded-xl bg-foreground">
              <ApexCharts title="Project Improvement" />
            </div>
          </div>
        </div>
        <div className="row-span-5 col-span-4 md:col-span-6 lg:col-span-4">
          <VerticalAccor title="Recent Activity" />
        </div>
        <div className="row-span-full col-span-2 px-2 md:col-span-6 lg:col-span-2">
          <div className="bg-red-100 dark:bg-danger rounded-xl h-20 mb-2 flex items-center text-danger dark:text-fontBase px-4 text-s gap-2">
            <InfoCircle size={28} />
            <p className="text-danger dark:text-fontBase">
              You haven't updated your email!
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="w-full bg-foreground rounded-md shadow-none">
              <CardHeader className="pb-0">
                <h3 className="text-fontHeader">To Do</h3>
              </CardHeader>
              <CardBody className="flex flex-col gap-2">
                {taskReminder.map((task, i) => {
                  return (
                    <TaskReminder
                      {...task}
                      baseColor={task.baseColor as BaseColor}
                    />
                  );
                })}
              </CardBody>
            </Card>
            <ProjectStats
              title="HRM Web App"
              status="On Going"
              daysLeft={240}
              totalTask={287}
            />
            <ProjectStats
              title="POS Web App"
              status="On Going"
              daysLeft={120}
              totalTask={97}
              chartType="line"
            />
          </div>
        </div>
      </div>
    </div>

    // <div className="w-full h-full p-2">
    //   <div className="grid grid-rows-8 grid-cols-6 grid-flow-col gap-2">
    //     <div className="row-span-3  col-span-4 pb-0">
    //       <div className="flex gap-2">
    //         <div className="w-60 flex flex-col 3xl:w-72">
    //           <MiniCard
    //             desc={getCurrentDateIndonesianFormat()}
    //             icon={<CalendarIcon className="text-secondary text-3xl" />}
    //             type="date"
    //             day={DayEn[new Date().getDay()]}
    //           />
    //           <MiniCard
    //             desc="28 Total Projects Running"
    //             icon={<InboxStackIcon className="text-secondary text-3xl" />}
    //           />
    //           <MiniCard
    //             desc="312 Total Tasks"
    //             icon={<ClipBoardTask className="text-secondary text-3xl" />}
    //           />
    //           <MiniCard
    //             desc="96 Active Employees"
    //             icon={<TwoUsersIcon className="text-secondary text-3xl" />}
    //           />
    //         </div>
    //         <div className="flex-auto rounded-xl bg-foreground">
    //           <ApexCharts title="Project Improvement" />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row-span-5 col-span-4">
    //       <VerticalAccor title="Recent Activity" />
    //     </div>
    //     <div className="row-span-full col-span-2 px-2">
    //       <div className="bg-red-100 dark:bg-danger rounded-xl h-20 mb-2 flex items-center text-danger dark:text-fontBase px-4 text-s gap-2">
    //         <InfoCircle size={28} />
    //         <p className="text-danger dark:text-fontBase">
    //           You haven't updated your email!
    //         </p>
    //       </div>
    //       <div className="flex flex-col gap-4">
    //         <Card className="w-full bg-foreground rounded-md shadow-none">
    //           <CardHeader className="pb-0">
    //             <h3 className="text-fontHeader">To Do</h3>
    //           </CardHeader>
    //           <CardBody className="flex flex-col gap-2">
    //             {taskReminder.map((task, i) => {
    //               return (
    //                 <TaskReminder
    //                   {...task}
    //                   baseColor={task.baseColor as BaseColor}
    //                 />
    //               );
    //             })}
    //           </CardBody>
    //         </Card>
    //         <ProjectStats
    //           title="HRM Web App"
    //           status="On Going"
    //           daysLeft={240}
    //           totalTask={287}
    //         />
    //         <ProjectStats
    //           title="POS Web App"
    //           status="On Going"
    //           daysLeft={120}
    //           totalTask={97}
    //           chartType="line"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

{
  /* <CustomTable data={users} columns={columns} /> */
}

export default Dashboard;
