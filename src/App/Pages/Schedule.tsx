import React, { useEffect, useState } from "react";
import Calendar from "../Components/Calendar";
import {
   DayObj,
   GetCalendarType,
   generateMonth,
   initMonths,
} from "../Library/_types/ScheduleTypes";

const Schedule = () => {
   const [load, setLoad] = useState(false);
   const [date, setDate] = useState(new Date());
   const [year, setYear] = useState(date.getFullYear());
   const [month, setMonth] = useState(date.getMonth());
   const [currentMonth, setCurrentMonth] = useState<Array<Array<DayObj>>>([]);
   const [currentYear, setCurrentYear] = useState<Array<generateMonth>>([]);

   useEffect(() => {
      getCalendar({ year, month });
      getCalendarFullYear(year);
   }, [year, month]);

   function getCalendar(props: GetCalendarType) {
      const { year, month, isGenerateFullYear = false } = props;
      setLoad(true);
      let dayOne = new Date(year, month, 1).getDay();
      let lastDate = new Date(year, month + 1, 0).getDate();
      let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      let dayEnd = new Date(year, month, lastDate).getDay();
      let monthLastDate = new Date(year, month, 0).getDate();
      let currentMonth = [];

      for (let i = dayOne; i > 0; i--) {
         const currentDay = new Date(year, month - 1, monthLastDate - i + 1);
         let day: DayObj = {
            day: `${monthLastDate - i + 1}`,
            dayLabel: currentDay.toLocaleDateString("en-US", { weekday: "long" }),
            isActive: false,
            isToday: false,
         };
         currentMonth.push(day);
      }

      for (let i = 1; i <= lastDate; i++) {
         const currentDay = new Date(`${year}-${month + 1}-${i}`);

         let day: DayObj = {
            day: `${i}`,
            dayLabel: currentDay.toLocaleDateString("en-US", { weekday: "long" }),
            isActive: true,
            isToday:
               i === date.getDate() &&
               month === new Date().getMonth() &&
               year === new Date().getFullYear(),
         };

         currentMonth.push(day);
      }

      for (let i = dayEnd; i < 6; i++) {
         const currentDay = new Date(year, month + 1, i - dayEnd + 1);

         let day: DayObj = {
            day: `${i - dayEnd + 1}`,
            dayLabel: currentDay.toLocaleDateString("en-US", { weekday: "long" }),
            isActive: false,
            isToday: false,
         };
         currentMonth.push(day);
      }

      const kalenderMingguan = [];
      for (let i = 0; i < currentMonth.length; i += 7) {
         let week = currentMonth.slice(i, i + 7);
         let kurang = 7 - week.length;
         const currentDay = new Date(
            `${year}-${month + 1}-${parseInt(week[week.length - 1].day) + 1}`
         );
         // if (kurang > 0) {
         //    for (let i = 1; i <= kurang; i++) {
         //       let day: DayObj = {
         //          day: `${parseInt(week[week.length - 1].day) + 1}`,
         //          dayLabel: currentDay.toLocaleDateString("en-US", { weekday: "long" }),
         //          isActive: false,
         //          isToday: false,
         //       };
         //       week.push(day);
         //    }
         //    kalenderMingguan.push(week);
         // } else {
         // console.log(week, " week");
         kalenderMingguan.push(week);
         // }
      }

      if (isGenerateFullYear) {
         return kalenderMingguan;
      } else {
         setCurrentMonth(kalenderMingguan);
      }

      setLoad(false);
   }

   function getCalendarFullYear(year: number) {
      const month = 12;
      const generateYear: Array<any> = [];
      for (let i = 0; i < month; i++) {
         let generateMonth = getCalendar({ month: i, year, isGenerateFullYear: true });
         const obj = {
            month: initMonths[i],
            data: generateMonth,
         };
         generateYear.push(obj);
      }
      setCurrentYear(generateYear);
   }

   const props = {
      currentMonth,
      load,
      setYear,
      setMonth,
      year,
      month,
      currentYear,
   };

   return (
      <div className="bg-base">
         <Calendar {...props} />
      </div>
   );
};

export default Schedule;
