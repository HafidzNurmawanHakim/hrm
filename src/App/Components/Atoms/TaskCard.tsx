import { cn } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { useDispatch } from "react-redux";
import { setPrevRowHour } from "../../Store/reducers/ScheduleReducers/ScheduleSlice";
import { ItemHour } from "../../Library/_types/ScheduleTypes";
import { shallowEqual } from "react-redux";

interface TaskCardProps {
   el: JSX.Element[];
   hour: string;
   task: Array<any>;
   currentIndex: number;
}

const TaskCard = (props: TaskCardProps) => {
   const prevEl = useSelector((state: RootState) => state.ScheduleSlice.prevRowHour);
   const [fixRender, setFixRender] = useState<JSX.Element[]>([]);
   const dispatch: AppDispatch = useDispatch();
   const [loading, setLoading] = useState<boolean>(false);

   function getUnavailableIndex(currentHour: number, prevEl: ItemHour[]) {
      if (prevEl.length > 0) {
         let notAvailableIndex: number[] = [];
         let prevIndex = props.currentIndex - 1;
         for (let i = prevIndex; i >= 0; i--) {
            prevEl[i].toRender.filter((items, j) => {
               const id = items?.props.id;
               let data = id && !id.startsWith("empty") ? JSON.parse(id) : null;
               const startTask = data ? parseInt(data.from.substring(0, 2)) : 0;
               const endTask = data ? parseInt(data.to.substring(0, 2)) : 0;
               const notAvailableHour = [];

               for (let k = startTask; k <= endTask; k++) {
                  notAvailableHour.push(k);
               }
               if (notAvailableHour.includes(currentHour)) {
                  notAvailableIndex.push(j);
               }
               // props.currentIndex === 3 &&
               //    console.log({
               //       prevEl: prevEl[i],
               //       startTask,
               //       endTask,
               //       notAvailableHour,
               //       hour: props.hour,
               //    });
            });
         }
         return notAvailableIndex;
      }
      return [];
   }

   useEffect(() => {
      getFixEl();
      // console.log({ el: props.el });
   }, [dispatch]);

   const getFixEl = () => {
      setLoading(true);
      if (prevEl[props.currentIndex - 1]) {
         const currentHour = parseInt(props.hour.substring(0, 2));
         let getNotAvIndex = getUnavailableIndex(currentHour, prevEl);
         let notAvIndex = Array.from(new Set(getNotAvIndex.sort((a, b) => a - b)));
         // props.currentIndex === 3 && console.log({ notAvIndex, el: props.el });

         let findEl = props.el.filter(
            (el, index) => el.props.id && !el.props.id.startsWith("empty")
         );
         let rendered = [0, 1, 2, 3].map((item: number) => {
            if (!notAvIndex.includes(item)) {
               return (
                  findEl.shift() ?? (
                     <div
                        className={cn("w-20 m-2 h-full invisible z-10", `w-20`)}
                        key={"empty_" + item}
                        id={"empty_" + item}
                     ></div>
                  )
               );
            } else {
               return (
                  <div
                     className={cn("w-20 m-2 h-full invisible z-10", `w-20`)}
                     key={"empty_" + item}
                     id={"empty_" + item}
                  ></div>
               );
            }
         });

         dispatch(setPrevRowHour([{ hour: props.hour, toRender: rendered }]));
         setFixRender(rendered);
      } else {
         dispatch(setPrevRowHour([{ hour: props.hour, toRender: props.el }]));
         setFixRender(props.el);
      }
      setLoading(false);
   };
   if (loading) return <>load</>;

   return <div className="w-full h-60 z-20 flex">{fixRender && fixRender}</div>;
};

export default TaskCard;
