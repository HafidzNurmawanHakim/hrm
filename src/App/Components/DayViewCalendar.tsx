import React, { FC, useEffect, useState } from "react";
import DayPagination from "./Atoms/DayPagination";
import { Card } from "@nextui-org/react";
import { DayObj, ItemHour, TaskItem } from "../Library/_types/ScheduleTypes";
import TaskCard from "./Atoms/TaskCard";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store";
import { useDispatch } from "react-redux";
import { motion, LayoutGroup } from "framer-motion";
import { getUnavailableIndex } from "../Library/utils/helper";

interface DayViewProps {
  currentMonthForDay: Array<DayObj>;
  load: boolean;
}

const getHour = (format: "standart" | "militer", task: TaskItem[]) => {
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
  const task = useSelector(
    (state: RootState) => state.ScheduleSlice.taskInHour
  );

  const [currDay, setCurrDay] = useState<number>(new Date().getDay());
  const dispatch: AppDispatch = useDispatch();
  const [taskHour, setTaskHour] = useState(getHour("militer", task));
  const [fixElement, setFixElement] = useState<ItemHour[]>([]);
  const [loadEl, setLoadEl] = useState(false);

  useEffect(() => {
    generateEl();
  }, [dispatch, taskHour]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const el = document.getElementById(
      currentHour < 10 ? `0${currentHour}:00` : `${currentHour}:00`
    );
    if (!el) return;
    setTaskHour(getHour("militer", task));
    return el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [task]);

  function generateEl() {
    // Gunakan map() untuk menghasilkan array JSX
    setLoadEl(true);
    try {
      let element: ItemHour[] = [];
      taskHour.forEach((itemHour, rowIndex) => {
        if (element.length === 0) {
          if (itemHour.task.length > 0) {
            let Jsx = [0, 1, 2, 3].map((item, j) => {
              let itemData = itemHour.task[j]; // Mengakses elemen array menggunakan indeks j
              if (itemData) {
                let h = `h-${
                  (parseInt(itemData.to.substring(0, 2)) -
                    parseInt(itemData.from.substring(0, 2)) +
                    1) *
                  20
                }`;

                return {
                  key: rowIndex + itemData.from + itemData.to,
                  id: itemData.taskId,
                  props: {
                    dataFrom: itemData.from,
                    dataTo: itemData.to,
                    className: "w-64 m-2 z-30 " + h,
                    data: {
                      ...itemData.items,
                    },
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
              let h = `h-${
                (parseInt(itemData.to.substring(0, 2)) -
                  parseInt(itemData.from.substring(0, 2)) +
                  1) *
                20
              }`;

              return {
                key: rowIndex + itemData.from + itemData.to,
                id: itemData.taskId,
                props: {
                  dataFrom: itemData.from,
                  dataTo: itemData.to,
                  className: "w-64 m-2 z-30 " + h,
                  data: {
                    ...itemData.items,
                  },
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
              // console.log({elll: findEl.shift()})
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoadEl(false);
    }
  }

  const colorMode = ["bg-red-100"];

  console.log({ loadEl });

  return (
    <>
      <div className="w-full max-w-[1280px] bg-foreground p-4 rounded-xl ml-4 flex justify-center flex-col">
        <DayPagination summary={currentMonthForDay} pageDay={currDay} />
        <div className="my-2 max-h-[70vh] overflow-y-scroll overflow-x-hidden">
          <LayoutGroup>
            {taskHour.map((item, i) => {
              // const chooseEl = getEl(item.task, item.hour, getHour("militer"), i);
              return (
                <motion.div layout className="relative h-24" key={i}>
                  <Card
                    id={item.hour}
                    radius="sm"
                    shadow="none"
                    className="py-3 w-full h-full bg-base mx-4 px-2 my-1 z-10 absolute text-fontBase flex justify-center"
                  >
                    {item.hour}
                  </Card>
                  <div className="flex gap-4 top-0 left-8 my-2">
                    <div className="w-20"></div>

                    <TaskCard
                      {...item}
                      currentIndex={i}
                      el={fixElement}
                      loadEl={loadEl}
                    />
                  </div>
                </motion.div>
              );
            })}
          </LayoutGroup>
        </div>
      </div>
    </>
  );
};

export default DayViewCalendar;
