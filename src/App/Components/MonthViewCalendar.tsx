import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { FC } from "react";
import { DayObj, initDay, TaskItem } from "../Library/_types/ScheduleTypes";
import { CellCalendar } from "./Atoms/CellCalendar";

interface MonthViewProps {
  currentMonth: Array<Array<DayObj>>;
  load: boolean;
  taskInDay: Array<{
    taskInHour: TaskItem[];
    date: string;
  }>;
}

const MonthViewCalendar: FC<MonthViewProps> = ({
  currentMonth,
  load,
  taskInDay,
}) => {
  return (
    <Table
      removeWrapper
      color="secondary"
      classNames={{
        td: [
          "h-40 w-32 max-w-32 overflow-hidden rounded-2xl dark:border-background",
        ],
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
              className={`text-center bg-foreground text-secondary ${
                isSunday &&
                "bg-red-300 dark:bg-red-500 dark:text-white text-danger rounded-md"
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
              {i.map((j: DayObj, indexJ) => {
                const task = taskInDay.filter((item) => {
                  return item.date === j.date;
                });

                return (
                  <TableCell className={`text-center p-1 text-xl`} key={indexJ}>
                    <CellCalendar
                      label={j.day}
                      isToday={j.isToday}
                      isActive={j.isActive}
                      isWeekend={indexJ === 0}
                      task={task.length > 0 ? task[0].taskInHour : []}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default MonthViewCalendar;
