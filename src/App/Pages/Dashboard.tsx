import React, { ReactNode } from "react";
import SidePanel from "../Components/SidePanel";
import CustomTable, { Column } from "../Core/CustomTable";
import CustomTableCell from "../Core/Atoms/CustomTableCell";
import NextTable from "../Components/NextTable/Table";
import { users } from "../../Assets/data";

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

   const rows: Data[] = [
      {
         key: "1",
         name: "Tony Reichert",
         role: "CEO",
         status: "Active",
      },
      {
         key: "2",
         name: "Zoey Lang",
         role: "Technical Lead",
         status: "Paused",
      },
      {
         key: "3",
         name: "Jane Fisher",
         role: "Senior Developer",
         status: "Active",
      },
      {
         key: "4",
         name: "William Howard",
         role: "Community Manager",
         status: "Vacation",
      },
   ];

   return (
      <div className="w-screen h-screen bg-light overflow-hidden relative">
         <SidePanel />
         <div className="absolute pl-20 left-0 top-0  flex flex-col justify-between">
            <CustomTable columns={columns} data={users}>
               header
            </CustomTable>
            <NextTable />
         </div>
      </div>
   );
};

export default Dashboard;
