import React, { FC } from "react";
import { BaseColor, Priority, colorConfig } from "../../Library/_types/General";
import { Chip, cn } from "@nextui-org/react";

interface TaskReminderProps {
  hour: string;
  taskTitle: string;
  taskDesc: string;
  priority: Priority;
  baseColor: BaseColor;
}

const TaskReminder: FC<TaskReminderProps> = ({
  hour,
  taskTitle,
  taskDesc,
  baseColor = "default",
  priority = "low",
}) => {
  return (
    <div className="gap-2 flex flex-row py-0 text-fontBase">
      <div className="w-28 flex items-center justify-center p-2 my-2">
        <p>{hour}</p>
      </div>
      <div className={cn("w-2 rounded", `${colorConfig[baseColor]}`)}></div>
      <div className="grow flex">
        <div className="grow flex flex-col justify-center">
          <h5>{taskTitle}</h5>
          <p className="text-desc text-md line-clamp-1 max-w-72">{taskDesc}</p>
        </div>
        <div className="w-24 flex items-center ">
          <Chip
            variant="flat"
            color={
              priority === "high"
                ? "danger"
                : priority === "medium"
                ? "warning"
                : "secondary"
            }
            className="m-auto rounded-md"
          >
            {priority}
          </Chip>
        </div>
      </div>
    </div>
  );
};

export default TaskReminder;
