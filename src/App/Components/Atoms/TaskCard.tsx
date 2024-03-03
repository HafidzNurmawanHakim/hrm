import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  cn,
} from "@nextui-org/react";
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
    <div className="w-full h-auto z-20 flex relative">
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
              <span className="absolute left-1 h-[76%] mt-6 bg-red-200 w-2 z-50 rounded-md"></span>
              <Card
                radius="sm"
                className="rounded-md h-full w-full outline-none shadow-sm absolute top-0 left-0 z-40"
                shadow="none"
              >
                <CardHeader className="pl-6 justify-between pt-2 items-start">
                  <div className="max-w-36 text-md font-medium">
                    {itemHour.props?.data?.title}
                  </div>
                  <div className="">
                    <Chip
                      size="sm"
                      variant="flat"
                      className="rounded mb-2"
                      color="primary"
                    >
                      In Progress
                    </Chip>
                    <AvatarGroup size="sm" className="z-30" max={2}>
                      <Avatar
                        className="w-4 h-4 text-tiny"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                      <Avatar
                        className="w-4 h-4 text-tiny"
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                      />
                      <Avatar
                        className="w-4 h-4 text-tiny"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      />
                      <Avatar
                        className="w-4 h-4 text-tiny"
                        src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                      />
                      <Avatar
                        className="w-4 h-4 text-tiny"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                      />
                      <Avatar
                        className="w-6 h-6 text-tiny"
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                      />
                    </AvatarGroup>
                  </div>
                </CardHeader>
                <CardBody className=" pl-4 font-desc text-md truncate">
                  {itemHour.props?.data?.desc}
                </CardBody>
                <CardFooter className="pl-4 justify-between">
                  <div>
                    <Chip size="sm" className="rounded-md text-sm font-sans">
                      TaSK-2
                    </Chip>
                  </div>
                  <div></div>
                </CardFooter>
              </Card>
            </div>
          );
        }

        return (
          <div
            className={cn("w-64 m-2 h-full invisible z-10")}
            key={"empty_" + itemHour.key}
            id={"empty_" + itemHour.id}
          ></div>
        );
      })}
    </div>
  );
};

export default TaskCard;
