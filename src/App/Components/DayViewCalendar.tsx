import React, { FC, createElement, useEffect, useState } from "react";
import { Root, createRoot } from "react-dom/client";
import DayPagination from "./Atoms/DayPagination";
import { Card, ScrollShadow, cn } from "@nextui-org/react";
import { DayObj, ItemHour, TaskItem } from "../Library/_types/ScheduleTypes";
import TaskCard from "./Atoms/TaskCard";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store";
import { shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import { setPrevRowHour } from "../Store/reducers/ScheduleReducers/ScheduleSlice";

interface DayViewProps {
   currentMonthForDay: Array<DayObj>;
   load: boolean;
}

const task = [
   {
      from: "01:00",
      to: "02:00",
      taskId: "12412",
      items: {
         desc: "test 01:00",
      },
   },
   {
      from: "01:00",
      to: "03:00",
      taskId: "12232",
      items: {
         desc: "test 01:00 - test 03:00 ",
      },
   },
   {
      from: "02:00",
      to: "03:00",
      taskId: "12122",

      items: {
         desc: "02:00 - 03:00",
      },
   },
   {
      from: "03:00",
      to: "04:00",
      taskId: "19832",

      items: {
         desc: "03:00 - 04:00",
      },
   },
   {
      from: "04:00",
      to: "05:00",
      taskId: "19832",

      items: {
         desc: "04:00 - 05:00",
      },
   },
   {
      from: "03:00",
      to: "05:00",
      taskId: "36232",
      items: {
         desc: "03:00 - 05:00",
      },
   },
   {
      from: "05:00",
      to: "06:00",
      taskId: "36232",
      items: {
         desc: "05:00 - 06:00",
      },
   },
];

const DayViewCalendar: FC<DayViewProps> = ({ currentMonthForDay, load }) => {
   const [currDay, setCurrDay] = useState<number>(new Date().getDay());
   const dispatch: AppDispatch = useDispatch();

   useEffect(() => {
      const currentHour = new Date().getHours();
      const el = document.getElementById(
         currentHour < 10 ? `0${currentHour}:00` : `${currentHour}:00`
      );

      if (!el) return;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
   }, []);

   const getHour = (format: "standart" | "militer") => {
      let arrHour: Array<{ hour: string; task: Array<any> }> = [];

      if (format === "militer") {
         for (let i = 1; i <= 24; i++) {
            const currHour = i < 10 ? `0${i}:00` : `${i}:00`;
            const isThereTask = task.filter((items, i) => items.from === currHour);

            let obj = {
               hour: currHour,
               task: isThereTask,
            };
            arrHour.push(obj);
         }
      }
      // console.log(arrHour);
      return arrHour;
   };

   function getEl(
      task: Array<any>,
      hour: string,
      allTaskHour: Array<{ hour: string; task: Array<any> }>,
      currentIndex: number
   ) {
      let toRender: JSX.Element[] = [];
      let emptyTask: JSX.Element[] = [];
      const before = allTaskHour[currentIndex - 1]?.task;
      if (before && before.length > 0) {
         emptyTask = before.map((itemBefore, i: number) => {
            return (
               <div
                  className={cn("w-20 m-2 h-full invisible z-10", `w-${20 * before.length}`)}
                  key={"empty_" + i}
                  id={"empty_" + i}
               ></div>
            );
         });
         toRender = [...toRender, ...emptyTask];
      }

      if (task.length > 0) {
         let jsx = task.map((taskItem: TaskItem, i: number) => {
            let h =
               (parseInt(taskItem.to.substring(0, 2)) -
                  parseInt(taskItem.from.substring(0, 2)) +
                  1) *
               20;
            return (
               <div
                  className={cn("w-20 m-2 bg-red-400 z-30", `min-h-${h} h-${h}`)}
                  key={i + taskItem.from + taskItem.to}
                  id={JSON.stringify({ from: taskItem.from, to: taskItem.to })}
               >
                  {taskItem.items?.desc}
               </div>
            );
         });
         toRender = [...toRender, ...jsx];

         const notAvIndex = before?.reduce((accumulator, itemBefore, i) => {
            const startTask = parseInt(itemBefore.from.substring(0, 2));
            const endTask = parseInt(itemBefore.to.substring(0, 2));
            const relevanHour = [];

            for (let j = startTask; j <= endTask; j++) {
               relevanHour.push(j);
            }

            const currentHourValue = parseInt(hour.substring(0, 2));

            if (endTask === currentHourValue || relevanHour.includes(currentHourValue)) {
               accumulator.push(i);
            }

            return accumulator;
         }, []);

         notAvIndex?.forEach((items: number, i: number) => {
            if (i !== items) {
               let findElIndex = toRender.findIndex(
                  (item, index) => item.props.id && !item.props.id.startsWith("empty")
               );
               let findEl = toRender[findElIndex];
               toRender = [
                  findEl,
                  ...toRender.slice(0, findElIndex),
                  ...toRender.slice(findElIndex + 1),
               ];
            }
         });
      }
      dispatch(setPrevRowHour([{ toRender, hour }]));
      return toRender;
   }

   return (
      <>
         <div className="w-full max-w-[1280px] bg-white p-4 rounded-xl ml-4 flex justify-center flex-col ">
            <DayPagination summary={currentMonthForDay} pageDay={currDay} />
            <div className="my-2 max-h-[70vh] overflow-y-scroll">
               {getHour("militer").map((item, i) => {
                  const chooseEl = getEl(item.task, item.hour, getHour("militer"), i);
                  return (
                     <div className="relative h-24" key={i}>
                        <Card
                           id={item.hour}
                           radius="sm"
                           shadow="none"
                           className="py-3 w-full h-full bg-base mx-4 px-2 my-1 z-10 absolute"
                        >
                           {item.hour}
                           <span className="absolute w-full h-[2px] rounded bg-red-200 block bottom-0"></span>
                        </Card>
                        <div className="flex gap-4 top-0 left-8 my-2">
                           <div className="w-20"></div>

                           <TaskCard
                              {...item}
                              // allTaskHour={getHour("militer")}
                              currentIndex={i}
                              el={chooseEl}
                           />
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </>
   );
};

export default DayViewCalendar;
