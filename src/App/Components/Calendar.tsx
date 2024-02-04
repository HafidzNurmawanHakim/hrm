import { Button, Tooltip } from "@nextui-org/react";
import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react";
import PlusIcon from "../../Assets/Icons/PlusIcon";
import { Category, Calendar1, Calendar2, ArrowRight3, ArrowLeft3 } from "iconsax-react";
import { DayObj, ViewType, generateMonth, initMonths } from "../Library/_types/ScheduleTypes";
import MonthViewCalendar from "./MonthViewCalendar";
import DayViewCalendar from "./DayViewCalendar";
import MonthPagination from "./Atoms/MonthPagination";

const ButtonType: Array<{ viewType: ViewType; icon: ReactElement }> = [
   {
      viewType: "Year",
      icon: <Category size={20} />,
   },
   {
      viewType: "Month",
      icon: <Calendar2 size={20} />,
   },
   {
      viewType: "Day",
      icon: <Calendar1 size={20} />,
   },
];

const monthsAsObjects = initMonths.map((month, index) => ({
   value: month.toLowerCase(),
   label: month,
}));

interface CalendarProps {
   setYear: Dispatch<SetStateAction<number>>;
   setMonth: Dispatch<SetStateAction<number>>;
   month: number;
   year: number;
   currentMonth: Array<Array<DayObj>>;
   currentMonthForDay: Array<DayObj>;
   load: boolean;
   currentYear: Array<generateMonth>;
}

const Calendar: FC<CalendarProps> = ({
   setYear,
   load,
   setMonth,
   currentYear,
   year,
   month,
   currentMonth,
   currentMonthForDay,
}) => {
   const [viewType, setViewType] = useState<ViewType>("Month");

   const prev = (type: string) => {
      switch (type) {
         case "year":
            setYear((prev) => prev - 1);

            break;
         case "month":
            setMonth((prev) => prev - 1);
            break;

         default:
            break;
      }
   };
   const next = (type: string) => {
      setYear((prev) => prev + 1);
   };

   return (
      <div className="flex justify-between gap-2">
         <div className="flex-initial w-[80%]">
            <div className="pt-6 pb-2 px-6 flex justify-between items-center ">
               <MonthPagination
                  pageMonth={monthsAsObjects}
                  setMonth={(page) => setMonth(page)}
                  page={month}
               />

               <div className="text-gray-500 text-2xl bg-white flex gap-2 items-center p-2 rounded mr-4">
                  <Button
                     aria-label="next page"
                     isIconOnly
                     size="sm"
                     variant="flat"
                     color="secondary"
                     onClick={() => prev("year")}
                  >
                     <ArrowLeft3 size={20} />
                  </Button>
                  <span className="">{year}</span>
                  <Button
                     aria-label="next page"
                     isIconOnly
                     size="sm"
                     variant="flat"
                     color="secondary"
                     onClick={() => next("year")}
                  >
                     <ArrowRight3 size={20} />
                  </Button>
               </div>
            </div>
            {viewType === "Month" ? (
               <MonthViewCalendar load={load} currentMonth={currentMonth} />
            ) : viewType === "Day" ? (
               <DayViewCalendar load={load} currentMonthForDay={currentMonthForDay} />
            ) : (
               <>year</>
            )}
         </div>

         <div className="w-[30%]">
            <div className="text-gray-500 text-2xl flex gap-4 items-center p-8 justify-end">
               {ButtonType.map((item, i) => {
                  return (
                     <Tooltip content={item.viewType} key={i}>
                        <Button
                           size="sm"
                           color="secondary"
                           variant={item.viewType === viewType ? "flat" : "light"}
                           isIconOnly
                           onClick={() => setViewType(item.viewType)}
                        >
                           {item.icon}
                        </Button>
                     </Tooltip>
                  );
               })}

               <Button size="sm" color="secondary" startContent={<PlusIcon />}>
                  Create Task
               </Button>
            </div>
         </div>
      </div>
   );
};

export default Calendar;
