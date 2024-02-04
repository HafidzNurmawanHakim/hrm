import React, { FC, useState } from "react";
import DayPagination from "./Atoms/DayPagination";
import { ScrollShadow } from "@nextui-org/react";
import { DayObj } from "../Library/_types/ScheduleTypes";

interface DayViewProps {
   currentMonthForDay: Array<DayObj>;
   load: boolean;
}

const DayViewCalendar: FC<DayViewProps> = ({ currentMonthForDay, load }) => {
   const [currDay, setCurrDay] = useState<number>(new Date().getDay());

   // const summaryMonth = currentMonth.reduce((current, item, i) => {
   //    // if (item[i].day === "1") {
   //    console.log(current, item[i]);
   //    // }
   //    return current.concat(item);
   // });
   return (
      <>
         <div className="w-full max-w-[1280px] bg-white p-4 rounded-xl ml-4 flex justify-center">
            <DayPagination summary={currentMonthForDay} pageDay={currDay} />
         </div>
      </>
   );
};

export default DayViewCalendar;
