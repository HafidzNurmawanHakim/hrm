import React, { useState } from "react";
import MinusIcon from "../../Assets/Icons/Minus";
import RigthChevron from "../../Assets/Icons/DoubleRightChevron";
import { Button } from "@nextui-org/react";
import { useAppController } from "../Core/AppController";
import MenuItem from "./Atoms/MenuItem";
import MenuWithSubItem from "./Atoms/MenuWithSubItem";
import HomeIcons from "../../Assets/Icons/HomeIcons";
import DotCalendarIcon from "../../Assets/Icons/DotCalendarIcon";
import LogoutIcon from "../../Assets/Icons/LogoutIcon";
import {
  Calendar,
  Home2,
  NoteText,
  Profile2User,
  Setting2,
} from "iconsax-react";
import { NavLink } from "react-router-dom";

const SidePanel = () => {
  const { holdOn, setHoldOn, setShowPanel, showPanel, themeToggle } =
    useAppController();

  function handleMouseEnter() {
    return holdOn ? null : setShowPanel(true);
  }

  function handleMouseLeave() {
    return holdOn ? null : setShowPanel(false);
  }

  return (
    <div className="flex absolute left-0 z-50 max-w-[340px]">
      <div
        className="flex h-screen w-24 flex-col justify-between bg-foreground "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <div className="inline-flex h-16 w-24 items-center justify-center">
            <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              L
            </span>
          </div>

          <div className="">
            <div className="px-2">
              <div className="py-4">
                <NavLink
                  to="/"
                  className="t group relative flex justify-center rounded px-2 py-1.5 text-secondary"
                >
                  <Home2 size={30} />
                </NavLink>
              </div>

              <ul className="space-y-1 pt-4">
                <li>
                  <NavLink
                    to="/schedule"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-secondary"
                  >
                    <Calendar size={28} />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/schedule"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-secondary"
                  >
                    <Profile2User size={28} />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/kanban-note"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-secondary"
                  >
                    <NoteText size={28} />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/schedule"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-secondary"
                  >
                    <Setting2 size={28} />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 p-2">
          <form action="/logout">
            <button
              type="button"
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
        className={`flex h-screen flex-1 flex-col justify-between bg-foreground dark:bg-background overflow-hidden transition-all duration-300 relative ${
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
