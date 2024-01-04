import React, { ReactNode } from "react";
import SidePanel from "../Components/SidePanel";
import CustomTable, { Column } from "../Core/CustomTable";
import CustomTableCell from "../Components/Atoms/CustomTableCell";
import NextTable from "../Components/NextTable/Table";
import { users } from "../../Assets/data";
import { useAppController } from "../Core/AppController";
import ApexCharts from "../Components/Charts/ApexCharts";
import { Stats } from "../Components/Atoms/Stats";
import UserMinusIcon from "../../Assets/Icons/UserMinusIcon";
import AvatarGroups from "../Components/Atoms/AvatarGroups";
import PrecentageUp from "../Components/Atoms/PrecentageUp";
import ChartStatIcon from "../../Assets/Icons/ChartStatsIcon";
import MiniCard from "../Components/Atoms/MiniCard";
import InboxStackIcon from "../../Assets/Icons/InboxStack";
import ClipBoardTask from "../../Assets/Icons/ClipBoardTaskIcon";
import TwoUsersIcon from "../../Assets/Icons/TwoUsersIcon";
import CalendarIcon from "../../Assets/Icons/CalendarIcons";
import { DayEn } from "../Library/_types/General";
import { getCurrentDateIndonesianFormat } from "../Library/utils/helper";

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
         render: (item, columnKey) => <CustomTableCell item={item} columnKey={columnKey} />,
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
                  <div className="w-60 3xl:w-72">
                     <h1 className="text-2xl dark:text-light">Overview</h1>
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
                  <div className="flex-auto shadow-sm rounded-xl">
                     <ApexCharts />
                  </div>
               </div>
            </div>
            <div className="row-span-2 col-span-4 shadow-sm rounded-xl">
               {/* <NextTable /> */}
               <CustomTable data={users} columns={columns} title="Recent Activity" />
            </div>
            <div className="row-span-full col-span-6">
               <div className="flex flex-col gap-4 pt-8">
                  <Stats
                     label="Tasks"
                     bottomContent={() => (
                        <PrecentageUp precentage="67.81%" desc="Since last week" />
                     )}
                     icon={<ChartStatIcon className="text-4xl" />}
                     type="success"
                     status="Completed"
                     summary={240}
                  />
                  <Stats
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
                  />
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
