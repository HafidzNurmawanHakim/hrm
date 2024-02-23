import React, { FC, createElement, useEffect, useState } from "react";
import { Root, createRoot } from "react-dom/client";
import DayPagination from "./Atoms/DayPagination";
import { Card, ScrollShadow, cn } from "@nextui-org/react";
import {
  DayObj,
  ItemHour,
  TaskItem,
  ToRenderItem,
} from "../Library/_types/ScheduleTypes";
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
  {
    from: "06:00",
    to: "07:00",
    taskId: "3623322",
    items: {
      desc: "06:00 - 07:00",
    },
  },
  {
    from: "04:00",
    to: "06:00",
    taskId: "3623212",
    items: {
      desc: "04:00 - 06:00",
    },
  },
];

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
  return arrHour;
};

const DayViewCalendar: FC<DayViewProps> = ({ currentMonthForDay, load }) => {
  const [currDay, setCurrDay] = useState<number>(new Date().getDay());
  const dispatch: AppDispatch = useDispatch();
  const [taskHour, setTaskHour] = useState(getHour("militer"));
  const [fixElement, setFixElement] = useState<ItemHour[]>([]);

  const prevEl = useSelector(
    (state: RootState) => state.ScheduleSlice.prevRowHour
  );

  useEffect(() => {
    const currentHour = new Date().getHours();
    const el = document.getElementById(
      currentHour < 10 ? `0${currentHour}:00` : `${currentHour}:00`
    );

    if (!el) return;
    generateEl(prevEl);
    return el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [dispatch]);

  function getUnavailableIndex(
    currentHour: number,
    prevEl: ItemHour[],
    currentIndex: number
  ) {
    if (prevEl.length > 0) {
      let notAvailableIndex: number[] = [];
      let prevIndex = currentIndex - 1;
      for (let i = prevIndex; i >= 0; i--) {
        if (prevEl[i]) {
          prevEl[i].toRender.filter((items: ToRenderItem, j) => {
            const startTask = items.props?.dataFrom
              ? parseInt(items.props.dataFrom.substring(0, 2))
              : 0;
            const endTask = items.props?.dataTo
              ? parseInt(items.props.dataTo.substring(0, 2))
              : 0;
            const notAvailableHour = [];

            currentHour === 4 &&
              console.log({
                startTask,
                endTask,
                to: items.props?.dataTo,
                currentHour,
              });
            // console.log({ items, endTask, startTask });
            for (let k = startTask; k <= endTask; k++) {
              notAvailableHour.push(k);
            }
            if (notAvailableHour.includes(currentHour)) {
              notAvailableIndex.push(j);
            }
          });
        }
      }

      return notAvailableIndex;
    }
    return [];
  }

  function generateEl(prevEl: ItemHour[]) {
    // Gunakan map() untuk menghasilkan array JSX
    let element: ItemHour[] = [];
    taskHour.forEach((itemHour, rowIndex) => {
      if (element.length === 0) {
        if (itemHour.task.length > 0) {
          let Jsx = [0, 1, 2, 3].map((item, j) => {
            let itemData = itemHour.task[j]; // Mengakses elemen array menggunakan indeks j
            if (itemData) {
              let h =
                (parseInt(itemData.to.substring(0, 2)) -
                  parseInt(itemData.from.substring(0, 2)) +
                  1) *
                20;
              return {
                key: rowIndex + itemData.from + itemData.to,
                id: itemData.taskId,
                props: {
                  dataFrom: itemData.from,
                  dataTo: itemData.to,
                  className: cn("w-60 m-2 z-30", `min-h-${h} h-${h}`),
                  desc: itemData.items?.desc,
                },
              };
            } else {
              return {
                key: "empty_" + rowIndex + j,
                id: "empty_" + rowIndex + j,
              };
            }
          });
          // dispatch(setPrevRowHour([{ toRender: Jsx, hour: itemHour.hour }]));
          let temp = [{ toRender: Jsx, hour: itemHour.hour }];
          temp.forEach((payloadItem: ItemHour) => {
            const index = element.findIndex(
              (prevItem) => prevItem.hour === payloadItem.hour
            );
            if (index !== -1) {
              // Jika indeks sudah ada, ganti objek tersebut dengan yang baru
              element[index] = payloadItem;
            } else {
              // Jika indeks tidak ditemukan, tambahkan objek baru
              let newArr = [payloadItem];
              element = [...element, ...newArr];
            }
          });
        }
      } else {
        let Jsx = [0, 1, 2, 3].map((item, j) => {
          let itemData = itemHour.task[j]; // Mengakses elemen array menggunakan indeks j
          if (itemData) {
            let h =
              (parseInt(itemData.to.substring(0, 2)) -
                parseInt(itemData.from.substring(0, 2)) +
                1) *
              20;

            return {
              key: rowIndex + itemData.from + itemData.to,
              id: itemData.taskId,
              props: {
                dataFrom: itemData.from,
                dataTo: itemData.to,
                desc: itemData.items?.desc,
                className: cn("w-60 m-2 z-30", `min-h-${h} h-${h}`),
              },
            };
          } else {
            return {
              key: "empty_" + rowIndex + j,
              id: "empty_" + rowIndex + j,
            };
          }
        });

        let notAvailableIndex = getUnavailableIndex(
          parseInt(itemHour.hour.substring(0, 2)),
          element,
          rowIndex
        );
        let notAvIndex = Array.from(
          new Set(notAvailableIndex.sort((a, b) => a - b))
        );
        let findEl = Jsx.filter(
          (el, index) => el.id && !el.id.startsWith("empty")
        );
        let rendered = [0, 1, 2, 3].map((item: number) => {
          if (!notAvIndex.includes(item)) {
            return (
              findEl.shift() ?? {
                key: "empty_" + item,
                id: "empty_" + item,
              }
            );
          } else {
            return {
              key: "empty_" + item,
              id: "empty_" + item,
            };
          }
        });
        // dispatch(setPrevRowHour([{ toRender: rendered, hour: itemHour.hour }]));
        let temp2 = [{ toRender: rendered, hour: itemHour.hour }];
        temp2.forEach((payloadItem) => {
          const index = element.findIndex(
            (prevItem) => prevItem.hour === payloadItem.hour
          );
          if (index !== -1) {
            // Jika indeks sudah ada, ganti objek tersebut dengan yang baru
            element[index] = payloadItem;
          } else {
            // Jika indeks tidak ditemukan, tambahkan objek baru
            let newArr = [payloadItem];
            element = [...element, ...newArr];
          }
        });
      }
    });

    setFixElement(element);
  }

  return (
    <>
      <div className="w-full max-w-[1280px] bg-white p-4 rounded-xl ml-4 flex justify-center flex-col ">
        <DayPagination summary={currentMonthForDay} pageDay={currDay} />
        <div className="my-2 max-h-[70vh] overflow-y-scroll">
          {taskHour.map((item, i) => {
            // const chooseEl = getEl(item.task, item.hour, getHour("militer"), i);
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

                  <TaskCard {...item} currentIndex={i} el={fixElement} />
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
