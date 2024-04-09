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


export type BaseColor = 'success' | 'danger' | 'warning' | 'default' | 'primary'
export type Priority = 'high' | 'medium' | 'low' 

export const colorConfig = {
   warning: 'bg-amber-300',
   danger: 'bg-red-300',
   primary: 'bg-blue-300',
   violet: 'bg-violet-300',
   success: 'bg-emerald-300',
   default: 'bg-white'
}
export const bgSideStickDark = {
   warning: 'bg-amber-300',
   danger: 'bg-red-300',
   primary: 'bg-blue-300',
   violet: 'bg-violet-300',
   success: 'bg-emerald-300',
   default: 'bg-white'
}
export const bgSideStickLight = {
   warning: 'bg-amber-100',
   danger: 'bg-red-100',
   primary: 'bg-blue-100',
   violet: 'bg-violet-100',
   success: 'bg-emerald-100',
   default: 'bg-white'
}

export type StatusType = 'to_do' | 'in_progress' | 'in_review' | 'done'

export type Status = {
   type?: StatusType,
   label: string
   key: StatusType
}

export const status = [
   {
      type: 'to_do',
      key: 'to_do',
      label: 'To Do'
   },
   {
      type: 'in_progress',
      key: 'in_progress',
      label: 'In Progress'
   },
   {
      type: 'in_review',
      key: 'in_review',
      label: 'Review'
   },
   {
      type: 'done',
      key: 'done',
      label: 'Done'
   }
]
