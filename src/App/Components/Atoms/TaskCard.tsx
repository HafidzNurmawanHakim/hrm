import { Card, CardHeader, cn } from "@nextui-org/react";
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
  const prevEl = useSelector(
    (state: RootState) => state.ScheduleSlice.prevRowHour
  );
  const [fixRender, setFixRender] = useState<JSX.Element[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const toRender = props.el[props.currentIndex];
  if (loading) return <>load</>;

  console.log({ toRender });

  return (
    <div className="w-full h-60 z-20 flex">
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
                <div className="w-full pl-4 h-full">
                  <CardHeader>{itemHour.props?.desc}</CardHeader>
                </div>
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
