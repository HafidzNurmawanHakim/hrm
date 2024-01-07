import { ChipProps } from "@nextui-org/react";
import { users } from "../../../Assets/data";

export type Day =
   | "Sunday"
   | "Monday"
   | "Tuesday"
   | "Wednesday"
   | "Thursday"
   | "Friday"
   | "Saturday";

export const DayEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MonthsId = [
   "Januari",
   "Februari",
   "Maret",
   "April",
   "Mei",
   "Juni",
   "Juli",
   "Agustus",
   "September",
   "Oktober",
   "November",
   "Desember",
];


export type User = (typeof users)[0];

export const statusColorMap: Record<string, ChipProps["color"]> = {
   active: "success",
   paused: "danger",
   vacation: "warning",
};

