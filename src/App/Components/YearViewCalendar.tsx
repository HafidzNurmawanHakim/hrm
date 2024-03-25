import React, { FC } from "react";
import {
  DayObj,
  generateMonth,
  initDay,
} from "../Library/_types/ScheduleTypes";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CellCalendar } from "./Atoms/CellCalendar";

interface YearViewCalendar {
  currentYear: Array<generateMonth>;
}

const YearViewCalendar: FC<YearViewCalendar> = ({ currentYear }) => {
  console.log({ currentYear });
  return (
    <div className="w-full max-w-[1280px] bg-foreground p-4 rounded-xl ml-4 flex justify-center flex-col">
      <div className="w-full flex flex-wrap gap-4">
        {currentYear.map((yearItem) => {
          console.log({ yearItem });

          return (
            <Card className="shadow-sm w-[25rem] h-80 " key={yearItem.month}>
              <CardHeader>{yearItem.month}</CardHeader>
              <CardBody>
                <Table
                  removeWrapper
                  color="secondary"
                  aria-label="Example static collection table"
                >
                  <TableHeader>
                    {initDay.map((item: string, index: number) => {
                      const isSunday = index === 0;
                      return (
                        <TableColumn
                          className={`text-center bg-foreground text-secondary ${
                            isSunday && "bg-red-300 text-danger rounded-md"
                          }`}
                          key={index}
                        >
                          {item.slice(0, 3)}
                        </TableColumn>
                      );
                    })}
                  </TableHeader>
                  <TableBody>
                    {yearItem.data.map((month, indexI) => {
                      console.log({ month });

                      return (
                        <TableRow key={indexI}>
                          {month.map((j: DayObj, indexJ: number) => (
                            <TableCell
                              className={`text-center p-1 h-8 ${
                                j.isActive ? "" : "text-gray-300"
                              }`}
                              key={indexJ}
                            >
                              {j.isToday ? (
                                <Chip
                                  size="sm"
                                  variant="flat"
                                  color="secondary"
                                  className="rounded-md"
                                >
                                  {j.day}
                                </Chip>
                              ) : (
                                j.day
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default YearViewCalendar;
