import React from "react";
import SidePanel from "../Components/SidePanel";
import { Outlet } from "react-router-dom";
import { useAppController } from "../Core/AppController";
import { Navbar } from "@nextui-org/react";
import CustomNavbar from "../Components/Navbar";

const MainPage = () => {
   const { setHoldOn, holdOn } = useAppController();

   return (
      <div>
         <SidePanel />
         <div
            className={`dark:bg-background transition-all p-2 h-screen duration-300 overflow-auto bg-base pt-0 pl-0 ${
               holdOn ? "ml-[300px]" : "ml-16"
            }`}
         >
            <div className="">
               <CustomNavbar />
            </div>
            <Outlet />
         </div>
      </div>
   );
};

export default MainPage;
