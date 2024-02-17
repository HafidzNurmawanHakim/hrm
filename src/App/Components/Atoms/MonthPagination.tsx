import {
   usePagination,
   PaginationItemType,
   cn,
   Card,
   Button,
   ScrollShadow,
   Pagination,
   PaginationItemRenderProps,
} from "@nextui-org/react";
import { ArrowLeft3, ArrowRight3, More } from "iconsax-react";
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { initMonths } from "../../Library/_types/ScheduleTypes";

interface MonthPaginationProps {
   pageMonth: Array<{ value: string; label: string }>;
   setMonth: Dispatch<SetStateAction<number>>;
   page: number;
}

const MonthPagination: FC<MonthPaginationProps> = ({ pageMonth, setMonth, page }) => {
   const renderItem = ({
      ref,
      key,
      value,
      isActive,
      onNext,
      onPrevious,
      setPage,
      className,
   }: PaginationItemRenderProps) => {
      const handleSetPage = (page: number) => {
         let monthPage = page - 1;
         setPage(page);
         setMonth(monthPage);
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
            className="w-full h-full h-8"
            onClick={() => handleSetPage(value)}
            variant={isActive ? "solid" : "flat"}
         >
            {["", ...initMonths][value]}
         </Button>
      );
   };

   return (
      <ScrollShadow
         orientation="horizontal"
         visibility={page === 0 ? "right" : page === 11 ? "left" : "both"}
         size={100}
         hideScrollBar
      >
         <Pagination
            disableCursorAnimation
            showControls={false}
            total={pageMonth.length}
            initialPage={page + 1}
            className="gap-2"
            radius="full"
            renderItem={renderItem}
            variant="light"
         />
      </ScrollShadow>
   );
};

export default MonthPagination;
