import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import ChevronLeftIcon from "../../Assets/Icons/ChevronLeftIcon";
import ChevronRightIcon from "../../Assets/Icons/ChevronRightIcon";
import { TableCell, TableRow } from "@nextui-org/react";
import { CellCalendar } from "./Atoms/CellCalendar";
import { DayObj } from "../Library/_types/ScheduleTypes";

const { REACT_APP_BASE_URL } = process.env;

interface CarouselProps {
  item: Array<any>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  currentMonth: Array<Array<DayObj>>;
}

export default function Carousel({
  item,
  index,
  setIndex,
  currentMonth,
}: CarouselProps) {
  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full">
        <div className="mx-auto flex h-full max-w-7xl flex-col  justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {item.map((item, index) => {
                return currentMonth.map((i: Array<DayObj>, indexI) => {
                  return (
                    <TableRow key={indexI}>
                      {i.map((j: DayObj, indexJ) => (
                        <TableCell
                          className={`text-center p-2 text-xl ${
                            j.isActive
                              ? "text-gray-600 dark:text-light"
                              : "text-gray-300 dark:text-gray-700"
                          }
                           ${
                             indexJ === 0 && j.isActive
                               ? "bg-red-200 text-danger"
                               : indexJ === 0 && !j.isActive
                               ? "bg-red-100 text-red-300"
                               : ""
                           }
                           `}
                          key={indexJ}
                        >
                          <CellCalendar
                            label={j.day}
                            isToday={j.isToday}
                            isActive={j.isActive}
                            isWeekend={indexJ === 0}
                            task={[]}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                });
              })}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-foreground"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < item.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-foreground"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
