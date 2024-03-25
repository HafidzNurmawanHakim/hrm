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
import { DayObj } from "../../Library/_types/ScheduleTypes";

interface DayPaginationProps {
  summary: Array<DayObj>;
  pageDay: number;
}

const DayPagination: FC<DayPaginationProps> = ({ summary, pageDay }) => {
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
  }: PaginationItemRenderProps) => {
    const handleSetPage = (page: number) => {
      let monthPage = page - 1;
      setPage(page);
    };
    if (value === PaginationItemType.NEXT) {
      return (
        <Button
          key={page}
          aria-label="next page"
          isIconOnly
          variant="flat"
          color="secondary"
          onClick={onNext}
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
          onClick={onPrevious}
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
          <span className="bg-foreground text-secondary w-10 h-10 rounded-full flex items-center justify-center">
            {summary[value - 1].day}
          </span>
          <div className="my-2">{summary[value - 1].dayLabel.slice(0, 3)}</div>
        </div>
      </Button>
    );
  };

  const currentDay = summary.findIndex((item) => {
    return parseInt(item.day) === new Date().getDate() + 1;
  });

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
