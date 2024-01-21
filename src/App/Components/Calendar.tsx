import {
   Autocomplete,
   AutocompleteItem,
   Button,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   Tooltip,
} from "@nextui-org/react";
import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from "react";
import PlusIcon from "../../Assets/Icons/PlusIcon";
import { CellCalendar } from "./Atoms/CellCalendar";
import ChevronLeftIcon from "../../Assets/Icons/ChevronLeftIcon";
import ChevronRightIcon from "../../Assets/Icons/ChevronRightIcon";
import { toCamelCase } from "../Library/utils/helper";
import { Category, Calendar1, Calendar2, ArrowRight3, ArrowLeft3 } from "iconsax-react";
import {
   DayObj,
   ViewType,
   generateMonth,
   initDay,
   initMonths,
} from "../Library/_types/ScheduleTypes";
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
      <div>
         <div className=" pt-6 pb-4 px-6 flex justify-between items-center">
            <div className="text-gray-500 text-2xl max-w-[50%] flex gap-20 items-center">
               <MonthPagination
                  pageMonth={monthsAsObjects}
                  setMonth={(page) => setMonth(page)}
                  page={month}
               />

               <div className="text-gray-500 text-2xl flex items-center gap-6">
                  <Button
                     aria-label="next page"
                     isIconOnly
                     variant="flat"
                     color="secondary"
                     onClick={() => prev("year")}
                  >
                     <ArrowLeft3 />
                  </Button>
                  <span className="">{year}</span>
                  <Button
                     aria-label="next page"
                     isIconOnly
                     variant="flat"
                     color="secondary"
                     onClick={() => next("year")}
                  >
                     <ArrowRight3 />
                  </Button>
               </div>
            </div>
            <div className="text-gray-500 text-2xl flex gap-4 items-center">
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
         {viewType === "Month" ? (
            <MonthViewCalendar load={load} currentMonth={currentMonth} />
         ) : viewType === "Day" ? (
            <DayViewCalendar load={load} currentMonth={currentMonth} />
         ) : (
            <>year</>
         )}
      </div>
   );
};

export default Calendar;
