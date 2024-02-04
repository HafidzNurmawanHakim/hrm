import { Button, Card, Chip } from "@nextui-org/react";
import { Menu } from "iconsax-react";
import React from "react";

interface CellCalendar {
   label: string;
   isToday: boolean;
   isWeekend: boolean;
   isActive: boolean;
}

export const CellCalendar = (props: CellCalendar) => {
   const { isWeekend, label, isToday, isActive } = props;
   return (
      <Card shadow="none" className="relative bg-white w-full h-full rounded-xl overflow-hidden">
         {isWeekend && (
            <span className="absolute right-0 top-0 bottom-0 w-2 h-full bg-red-200 rounded-full"></span>
         )}
         <Button
            isIconOnly
            size="sm"
            color="secondary"
            variant="light"
            radius="full"
            className="absolute h-6 right-[6px] top-[6px]"
         >
            <Menu variant="Bold" size={16} />
         </Button>
         <Chip
            color="secondary"
            radius="sm"
            variant={isActive ? "flat" : "faded"}
            className="absolute left-[6px] bottom-[6px]"
         >
            {label}
         </Chip>
         <div className="absolute right-4 bottom-[6px]">
            {isToday && (
               <Chip color="secondary" variant="flat" size="sm">
                  Today
               </Chip>
            )}
         </div>
      </Card>
   );
};
