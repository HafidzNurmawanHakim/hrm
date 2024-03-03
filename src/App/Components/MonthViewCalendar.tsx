import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { FC } from "react";
import { DayObj, initDay } from "../Library/_types/ScheduleTypes";
import { CellCalendar } from "./Atoms/CellCalendar";

interface MonthViewProps {
  currentMonth: Array<Array<DayObj>>;
  load: boolean;
}

const MonthViewCalendar: FC<MonthViewProps> = ({ currentMonth, load }) => {
  console.log({ currentMonth });
  return (
    <Table
      removeWrapper
      color="secondary"
      classNames={{
        td: ["h-32 w-32 overflow-hidden rounded-2xl  dark:border-background"],
        tr: ["rounded-xl"],

        base: ["w-full max-w-[1280px] ml-4"],
      }}
      aria-label="Example static collection table"
    >
      <TableHeader>
        {initDay.map((item: string, index: number) => {
          const isSunday = index === 0;
          return (
            <TableColumn
              className={`text-center bg-white text-secondary ${
                isSunday && "bg-red-300 text-danger rounded-md"
              }`}
              key={index}
            >
              {item.slice(0, 3)}
            </TableColumn>
          );
        })}
      </TableHeader>
      <TableBody isLoading={load}>
        {currentMonth.map((i: Array<DayObj>, indexI) => {
          return (
            <TableRow key={indexI}>
              {i.map((j: DayObj, indexJ) => (
                <TableCell className={`text-center p-1 text-xl`} key={indexJ}>
                  <CellCalendar
                    label={j.day}
                    isToday={j.isToday}
                    isActive={j.isActive}
                    isWeekend={indexJ === 0}
                  />
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default MonthViewCalendar;
