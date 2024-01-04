import React, { useEffect, useState } from "react";

const initDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const initMonths = [
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

const Calendar = () => {
   const [date, setDate] = useState(new Date());
   const [year, setYear] = useState(date.getFullYear());
   const [month, setMonth] = useState(date.getMonth());
   const [currentMonth, setCurrentMonth] = useState<Array<string>>([]);

   useEffect(() => {
      getCalendar();
   }, []);

   function getCalendar() {
      let dayOne = new Date(year, month, 1).getDay();
      let lastDate = new Date(year, month + 1, 0).getDate();
      let dayEnd = new Date(year, month, lastDate).getDay();
      let monthLastDate = new Date(year, month, 0).getDate();
      let currentMonth = [];

      for (let i = dayOne; i > 0; i--) {
         currentMonth.push(`${monthLastDate - i + 1}`);
      }

      for (let i = dayOne; i <= monthLastDate; i++) {
         currentMonth.push(`${i}`);
      }

      for (let i = dayEnd; i < 6; i++) {
         currentMonth.push(`${i - dayEnd + 1}`);
      }
      setCurrentMonth(currentMonth);
   }

   return (
      <div>
        <div className="grid grid-cols-7 grid-rows-5 gap-4">
            {
               initDay.map((item: string, index: number) => {
                     return (
                        <div>{item.slice(0, 3)}</div>
                     )
               })
            }
         </div>
         <div className="grid grid-cols-7 grid-rows-5 gap-4">
            {currentMonth.map((item, index) => {
               return <div key={item}>{item}</div>;
            })}
         </div>
      </div>
   );
};

export default Calendar;
