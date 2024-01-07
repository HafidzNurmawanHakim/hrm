import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const initDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
  const [currentMonth, setCurrentMonth] = useState<Array<Array<string>>>([]);

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

    const kalenderMingguan = [];
    for (let i = 0; i < currentMonth.length; i += 7) {
      kalenderMingguan.push(currentMonth.slice(i, i + 7));
    }

    setCurrentMonth(kalenderMingguan);
  }

  return (
    <div>
      <Table
        classNames={{
          td: [
            "h-32 w-32 border-8 border-white bg-danger rounded-xl overflow-hidden",
          ],
          tr: ["rounded-xl"],
        }}
        aria-label="Example static collection table"
      >
        <TableHeader>
          {initDay.map((item: string, index: number) => {
            return (
              <TableColumn className="text-center" key={index}>
                {item.slice(0, 3)}
              </TableColumn>
            );
          })}
        </TableHeader>
        <TableBody>
          {currentMonth.map((i: Array<string>, indexI) => (
            <TableRow key={indexI}>
              {i.map((j: string, indexJ) => (
                <TableCell className="text-center p-2" key={indexJ}>
                  {j}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className="grid grid-cols-7 grid-rows-5 gap-4">
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
         </div> */}
    </div>
  );
};

export default Calendar;
