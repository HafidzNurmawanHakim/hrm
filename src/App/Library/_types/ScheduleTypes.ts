export interface DayObj {
   day: string;
   dayLabel: string;
   isActive: boolean;
   isToday: boolean;
}

export type ViewType = "Year" | "Month" | "Day";

export type generateMonth = {
   month: string;
   data: Array<Array<DayObj>>;
};

export const initDay = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
];
export const initMonths = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

export type GetCalendarType = {
   year: number;
   month: number;
   isGenerateFullYear?: boolean;
};
export interface ItemHour {
   toRender: ToRenderItem[];
   hour: string;
}

export interface ToRenderItem {
   key:string
   id: string,
   props?: {
      className?: string
      dataFrom: string,
      dataTo:string,
      desc?:string
   }
}

export type TaskItem = { to: string; from: string; taskId: string; items: { desc: string } };
