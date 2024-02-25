import { Card, CardHeader, Chip, cn } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { ItemHour, TaskItem } from "../../Library/_types/ScheduleTypes";

interface TaskCardProps {
   el: ItemHour[];
   hour: string;
   task: Array<any>;
   currentIndex: number;
}

const TaskCard = (props: TaskCardProps) => {
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      setTimeout(() => {
         setLoading(false);
      }, 300);
   }, [props.el]);

   const toRender = props.el[props.currentIndex];
   if (loading) return <>load</>;

   return (
      <div className="w-full h-80 z-20 flex">
         {toRender?.toRender.map((itemHour, i) => {
            let id = itemHour.id;
            if (!id.startsWith("empty")) {
               return (
                  <div
                     className={cn(itemHour.props?.className, "relative")}
                     key={itemHour.key}
                     id={itemHour.id}
                     data-from={itemHour.props?.dataFrom}
                     data-to={itemHour.props?.dataTo}
                  >
                     <span className="absolute left-1 h-[76%] mt-6 bg-red-200 w-2 z-20 rounded-md"></span>
                     <Card
                        radius="sm"
                        className="rounded-md h-full outline-none shadow-sm z-10"
                        shadow="none"
                     >
                        <CardHeader className="pl-6 justify-between">
                           <div className="max-w-36 text-md font-medium">
                              {itemHour.props?.data?.title}
                           </div>
                           <div className="self-start">
                              <Chip size="sm" className="rounded-md text-sm font-sans">
                                 TaSK-2
                              </Chip>
                           </div>
                        </CardHeader>
                     </Card>
                  </div>
               );
            }

            return (
               <div
                  className={cn("w-60 m-2 h-full invisible z-10", `w-20`)}
                  key={"empty_" + itemHour.key}
                  id={"empty_" + itemHour.id}
               ></div>
            );
         })}
      </div>
   );
};

export default TaskCard;
