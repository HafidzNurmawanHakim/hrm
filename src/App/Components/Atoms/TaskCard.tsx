import { cn } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { useDispatch } from "react-redux";
import { setPrevRowHour } from "../../Store/reducers/ScheduleReducers/ScheduleSlice";
import { ItemHour, TaskItem } from "../../Library/_types/ScheduleTypes";
import { shallowEqual } from "react-redux";

interface TaskCardProps {
   el: ItemHour[];
   hour: string;
   task: Array<any>;
   currentIndex: number;
}

const TaskCard = (props: TaskCardProps) => {
   const prevEl = useSelector((state: RootState) => state.ScheduleSlice.prevRowHour);
   const [fixRender, setFixRender] = useState<JSX.Element[]>([]);
   const dispatch: AppDispatch = useDispatch();
   const [loading, setLoading] = useState<boolean>(false);

   const toRender = props.el[props.currentIndex];
   if (loading) return <>load</>;

   return (
      <div className="w-full h-60 z-20 flex">
         {toRender !== undefined ? toRender.toRender : <></>}
      </div>
   );
};

export default TaskCard;
