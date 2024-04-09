import {
  usePagination,
  PaginationItemType,
  cn,
  Card,
  Button,
  ScrollShadow,
  PaginationItemRenderProps,
  Pagination,
} from "@nextui-org/react";
import { ArrowLeft3, ArrowRight3, More } from "iconsax-react";
import React, { FC } from "react";
import { DayObj, TaskItem } from "../../Library/_types/ScheduleTypes";
import { colorConfig } from "../../Library/_types/General";

interface DayPaginationProps {
  summary: Array<DayObj>;
  onDayChange: (value: number) => void;
  taskInDay: Array<{
    taskInHour: TaskItem[];
    date: string;
  }>;
  year: number;
  month: number;
}

const DayPagination: FC<DayPaginationProps> = ({
  summary,
  onDayChange = () => {},
  taskInDay,
  year,
  month,
}) => {
  const currentDay = summary.findIndex((item) => {
    return parseInt(item.day) === new Date().getDate() + 1;
  });

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
    page,
    activePage,
  }: PaginationItemRenderProps) => {
    const handleSetPage = (page: number) => {
      setPage(page);
      onDayChange(page);
    };
    if (value === PaginationItemType.NEXT) {
      return (
        <Button
          key={page}
          aria-label="next page"
          isIconOnly
          variant="flat"
          color="secondary"
          onClick={() => {
            onNext();
            onDayChange(activePage + 1);
          }}
          //    className="hidden"
        >
          <ArrowRight3 />
        </Button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <Button
          key={page}
          aria-label="next page"
          isIconOnly
          variant="flat"
          color="secondary"
          onClick={() => {
            onPrevious();
            onDayChange(activePage - 1);
          }}
          //    className="hidden"
        >
          <ArrowLeft3 />
        </Button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <Button
          isIconOnly
          variant="light"
          radius="full"
          color="secondary"
          className="w-4 h-4 rounded-full"
          key={key}
        >
          <More />
        </Button>
      );
    }

    const totalTask = taskInDay.filter((item) => {
      return (
        item.date ===
        `${value < 10 ? `0${value}` : value}-${
          month + 1 < 10 ? `0${month + 1}` : month + 1
        }-${year}`
      );
    });

    // cursor is the default item
    return (
      <Button
        color="secondary"
        ref={ref}
        key={key}
        className="w-16 h-24 mx-1 "
        onClick={() => handleSetPage(value)}
        variant={isActive ? "solid" : "flat"}
      >
        <div className="">
          <span>{summary[value - 1].day}</span>
          <div className="">{summary[value - 1].dayLabel.slice(0, 3)}</div>
          <div className="flex gap-1 flex-wrap justify-center mt-1">
            {totalTask.length > 0 &&
            totalTask[0].date.substring(0, 2) ===
              (parseInt(summary[value - 1].day) < 10
                ? `0${summary[value - 1].day}`
                : summary[value - 1].day)
              ? totalTask[0].taskInHour.length > 0
                ? totalTask[0].taskInHour.map((item, i) => {
                    return (
                      <span
                        className={cn(
                          "size-[6px] block rounded-full",
                          colorConfig[item.baseColor]
                        )}
                      ></span>
                    );
                  })
                : null
              : null}
          </div>
        </div>
      </Button>
    );
  };

  return (
    <Pagination
      disableCursorAnimation
      showControls={true}
      total={summary.length}
      initialPage={currentDay}
      className="gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
      isCompact={false}
      size="lg"
      siblings={4}
    />
  );
};

export default DayPagination;
