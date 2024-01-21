import React, { FC, useState } from "react";
import DayPagination from "./Atoms/DayPagination";
import { ScrollShadow } from "@nextui-org/react";
import { DayObj } from "../Library/_types/ScheduleTypes";

interface DayViewProps {
   currentMonth: Array<Array<DayObj>>;
   load: boolean;
}

const DayViewCalendar: FC<DayViewProps> = ({ currentMonth, load }) => {
   const [currDay, setCurrDay] = useState<number>(new Date().getDay());

   const summaryMonth = currentMonth.reduce((current, item) => current.concat(item));
   return (
      <>
         <div className="max-w-[70%] bg-white p-4 rounded-xl flex justify-center">
            <DayPagination summary={summaryMonth} pageDay={currDay} />
         </div>
      </>
   );
};

export default DayViewCalendar;
