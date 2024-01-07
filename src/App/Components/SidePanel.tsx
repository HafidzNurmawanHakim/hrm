import React, { useState } from "react";
import MinusIcon from "../../Assets/Icons/Minus";
import RigthChevron from "../../Assets/Icons/RightChevron";
import { Button } from "@nextui-org/react";
import { useAppController } from "../Core/AppController";
import MenuItem from "./Atoms/MenuItem";
import MenuWithSubItem from "./Atoms/MenuWithSubItem";
import HomeIcons from "../../Assets/Icons/HomeIcons";
import DotCalendarIcon from "../../Assets/Icons/DotCalendarIcon";
import LogoutIcon from "../../Assets/Icons/LogoutIcon";

const SidePanel = () => {
   const { holdOn, setHoldOn, setShowPanel, showPanel, themeToggle } = useAppController();

   function handleMouseEnter() {
      return holdOn ? null : setShowPanel(true);
   }

   function handleMouseLeave() {
      return holdOn ? null : setShowPanel(false);
   }

   return (
      <div className="flex absolute left-0 z-50 bg-danger max-w-[300px] shadow">
         <div
            className="flex h-screen w-16 flex-col justify-between bg-white dark:bg-background"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            <div>
               <div className="inline-flex h-16 w-16 items-center justify-center">
                  <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                     L
                  </span>
               </div>

               <div className="">
                  <div className="px-2">
                     <div className="py-4">
                        <a
                           href=""
                           className="t group relative flex justify-center rounded px-2 py-1.5 text-secondary"
                        >
                           <HomeIcons />
                        </a>
                     </div>

                     <ul className="space-y-1 pt-4">
                        <li>
                           <a
                              href="/schedule"
                              className="group relative flex justify-center rounded px-2 py-1.5 text-secondary"
                           >
                              <DotCalendarIcon />
                           </a>
                        </li>

                        <li>
                           <a
                              href=""
                              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 opacity-75"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 stroke-width="2"
                              >
                                 <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                 />
                              </svg>
                           </a>
                        </li>

                        <li>
                           <a
                              href=""
                              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 opacity-75"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 stroke-width="2"
                              >
                                 <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                 />
                              </svg>
                           </a>
                        </li>

                        <li>
                           <a
                              href=""
                              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5 opacity-75"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 stroke-width="2"
                              >
                                 <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                 />
                              </svg>
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 p-2">
               <form action="/logout">
                  <button
                     type="button"
                     onClick={() => themeToggle()}
                     className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-secondary"
                  >
                     <LogoutIcon />

                     <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                        Logout
                     </span>
                  </button>
               </form>
            </div>
         </div>

         <div
            className={`flex h-screen flex-1 flex-col justify-between bg-white dark:bg-background overflow-hidden transition-all duration-300 relative ${
               holdOn || showPanel ? "w-[300px]" : "w-[0px]"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            <div className="absolute top-4 right-4">
               <Button
                  isIconOnly
                  color="primary"
                  size="sm"
                  aria-label="Like"
                  onClick={() => {
                     setHoldOn(!holdOn);
                     if (holdOn) {
                        setShowPanel(false);
                     }
                  }}
               >
                  <RigthChevron
                     className={`text-sm transition-all duration-300 ${
                        showPanel ? "rotate-180" : "rotate-0"
                     }`}
                  />
               </Button>
            </div>
            <div className="px-4 py-6">
               <ul className="mt-14 space-y-1">
                  <MenuItem>General</MenuItem>

                  <MenuWithSubItem label="Teams">
                     <>
                        <MenuItem>All Member</MenuItem>
                        <MenuItem>Banned</MenuItem>
                     </>
                  </MenuWithSubItem>

                  <MenuItem>Billing</MenuItem>
                  <MenuItem>Invoices</MenuItem>

                  <MenuWithSubItem label="Account">
                     <>
                        <MenuItem>Details</MenuItem>
                        <MenuItem>Security</MenuItem>
                     </>
                  </MenuWithSubItem>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default SidePanel;
