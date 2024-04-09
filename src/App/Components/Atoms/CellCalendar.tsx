import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Menu } from "iconsax-react";
import React from "react";
import { TaskItem } from "../../Library/_types/ScheduleTypes";

interface CellCalendar {
  label: string;
  isToday: boolean;
  isWeekend: boolean;
  isActive: boolean;
  task: TaskItem[];
}

export const CellCalendar = (props: CellCalendar) => {
  const { isWeekend, label, isToday, isActive, task } = props;

  const show = task.slice(0, 3);

  return (
    <Card
      shadow="none"
      className="relative bg-foreground h-full rounded-xl overflow-hidden "
    >
      <Popover placement="right-start" backdrop="blur">
        <PopoverTrigger>
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
        </PopoverTrigger>
        <PopoverContent className="rounded-md w-40 h-40 shadow-sm bg-blue-200">
          test
        </PopoverContent>
      </Popover>
      <CardBody className="flex flex-col gap-1 mt-4 overflow-y-hidden">
        {show.map((item) => {
          return (
            <Chip
              endContent={
                <>
                  <Divider orientation="vertical" className="mx-1"></Divider>
                  {item.items.taskKey}
                </>
              }
              color={item.baseColor}
              size="sm"
              className="rounded-md "
              key={item.taskId}
            >
              <p className="max-w-20 truncate ...">{item.items.desc}</p>
            </Chip>
          );
        })}
      </CardBody>
      <Chip
        color={isWeekend ? "danger" : "secondary"}
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
