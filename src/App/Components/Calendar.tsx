import { Button, Tooltip, cn } from "@nextui-org/react";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import PlusIcon from "../../Assets/Icons/PlusIcon";
import {
  Category,
  Calendar1,
  Calendar2,
  ArrowRight3,
  ArrowLeft3,
  BackwardItem,
} from "iconsax-react";
import {
  DayObj,
  ViewType,
  generateMonth,
  initMonths,
} from "../Library/_types/ScheduleTypes";
import MonthViewCalendar from "./MonthViewCalendar";
import DayViewCalendar from "./DayViewCalendar";
import MonthPagination from "./Atoms/MonthPagination";
import YearViewCalendar from "./YearViewCalendar";
import { useAppController } from "../Core/AppController";
import TaskTrackerSchedule from "./TaskTrackerSchedule";

const ButtonType: Array<{ viewType: ViewType; icon: ReactElement }> = [
  {
    viewType: "Year",
    icon: <Category size={20} />,
  },
  {
    viewType: "Month",
    icon: <Calendar2 size={20} />,
  },
  {
    viewType: "Day",
    icon: <Calendar1 size={20} />,
  },
];

const monthsAsObjects = initMonths.map((month, index) => ({
  value: month.toLowerCase(),
  label: month,
}));

interface CalendarProps {
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  month: number;
  year: number;
  currentMonth: Array<Array<DayObj>>;
  currentMonthForDay: Array<DayObj>;
  load: boolean;
  currentYear: Array<generateMonth>;
}

const Calendar: FC<CalendarProps> = ({
  setYear,
  load,
  setMonth,
  currentYear,
  year,
  month,
  currentMonth,
  currentMonthForDay,
}) => {
  const { holdOn } = useAppController();
  const [viewType, setViewType] = useState<ViewType>("Month");

  const prev = (type: string) => {
    switch (type) {
      case "year":
        setYear((prev) => prev - 1);

        break;
      case "month":
        setMonth((prev) => prev - 1);
        break;

      default:
        break;
    }
  };
  const next = (type: string) => {
    setYear((prev) => prev + 1);
  };

  return (
    <div className="">
      <div className="flex justify-between gap-2">
        <div
          className={cn(
            "flex-initial w-[72%] overflow-x-hidden",
            holdOn ? "w-full" : ""
          )}
        >
          {viewType === "Year" ? (
            <div className="py-6 px-6 flex justify-between w-full max-w-[1280px] rounded-md items-center bg-white my-2 ml-4">
              <Button
                aria-label="next page"
                isIconOnly
                size="sm"
                variant="flat"
                color="secondary"
                onClick={() => prev("year")}
              >
                <ArrowLeft3 size={20} />
              </Button>
              <span className="text-2xl">{year}</span>
              <Button
                aria-label="next page"
                isIconOnly
                size="sm"
                variant="flat"
                color="secondary"
                onClick={() => next("year")}
              >
                <ArrowRight3 size={20} />
              </Button>
            </div>
          ) : (
            <div className="pt-4 pb-4 pb-2 px-6 flex justify-between w-full max-w-[1280px] rounded-md items-center bg-white my-2 ml-4">
              <MonthPagination
                pageMonth={monthsAsObjects}
                setMonth={(page) => setMonth(page)}
                page={month}
              />

              <div className="text-gray-500 text-2xl bg-white flex gap-8 items-center p-2 rounded mr-4">
                <Button
                  aria-label="next page"
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onClick={() => prev("year")}
                >
                  <ArrowLeft3 size={20} />
                </Button>
                <span className="">{year}</span>
                <Button
                  aria-label="next page"
                  isIconOnly
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onClick={() => next("year")}
                >
                  <ArrowRight3 size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div
          className={cn(
            "bg-white mt-2 flex items-center justify-end pr-4 rounded-md h-fit py-6",
            holdOn ? "w-[22%]" : "w-[28%]"
          )}
        >
          <div className="text-gray-500 text-2xl flex gap-4 items-center justify-end bg-white rounded-md">
            {ButtonType.map((item, i) => {
              return (
                <Tooltip content={item.viewType} key={i}>
                  <Button
                    size="sm"
                    color="secondary"
                    variant={item.viewType === viewType ? "flat" : "light"}
                    isIconOnly
                    onClick={() => setViewType(item.viewType)}
                  >
                    {item.icon}
                  </Button>
                </Tooltip>
              );
            })}

            {holdOn ? (
              <Button size="sm" color="secondary" startContent={<PlusIcon />}>
                Task
              </Button>
            ) : (
              <Button size="sm" color="secondary" startContent={<PlusIcon />}>
                Create Task
              </Button>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex justify-between gap-2",
          holdOn ? "flex-col" : "flex-row"
        )}
      >
        <div
          className={cn(
            "flex-initial w-[72%] overflow-x-hidden",
            holdOn ? "w-full" : ""
          )}
        >
          {viewType === "Month" ? (
            <MonthViewCalendar load={load} currentMonth={currentMonth} />
          ) : viewType === "Day" ? (
            <DayViewCalendar
              load={load}
              currentMonthForDay={currentMonthForDay}
            />
          ) : (
            <YearViewCalendar currentYear={currentYear} />
          )}
        </div>
        <div className="w-[28%]">
          <TaskTrackerSchedule />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
