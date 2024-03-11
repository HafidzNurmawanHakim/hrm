import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import React, { FC } from "react";
import TimelineDate from "./TimelineDate";

interface TimelineItemProps {
  user: string;
  comment?: string | null;
  type: string;
  updateProgress?: string | null;
  progressBefore?: string | null;
  time: string;
  date: string | Date;
}

const updateType = {
  update_task: "Update task progress",
  comment_task: "Commented task",
};

const progressType = {
  in_progress: "In Progress",
  to_do: "To Do",
};

const TimelineItem: FC<TimelineItemProps> = ({
  user,
  comment,
  type,
  updateProgress,
  progressBefore,
  time,
  date,
}) => {
  return (
    <div className="flex gap-1">
      <div className="w-24 flex items-center justify-center">
        <TimelineDate date={date} />
      </div>
      <span className="w-[6px] bg-green-300 flex items-center rounded-md">
        <span className="relative">
          <span className="absolute w-4 h-4 rounded-full bg-red-200 rotate-45 transform origin-top-right -translate-x-[2px]"></span>
        </span>
      </span>
      <div className="grow relative pl-2">
        <div className="flex items-center justify-start">
          <div className="w-3 overflow-hidden">
            <div className="h-4 bg-green-200 rotate-45 transform origin-bottom-right rounded-sm"></div>
          </div>
          <div className="bg-green-200 p-1 my-6 rounded-lg flex-1">
            <Card className="shadow-none p-0 rounded-md bg-transparent">
              <CardHeader className="py-0 text-md gap-2">
                <p>{user}</p>
                <p className="text-sm text-gray-500 italic">
                  {updateType[type as keyof typeof updateType]}
                </p>
              </CardHeader>
              <CardBody className="py-1 text-md text-sm">
                <div className="">
                  {<p>{comment ? comment : null}</p>}
                  {updateProgress ? (
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        className="rounded-md text-sm font-sans"
                        variant="flat"
                        color="default"
                      >
                        {
                          progressType[
                            progressBefore as keyof typeof progressType
                          ]
                        }
                      </Chip>
                      <span>to</span>
                      <Chip
                        size="sm"
                        className="rounded-md text-sm font-sans"
                        variant="flat"
                        color="secondary"
                      >
                        {
                          progressType[
                            updateProgress as keyof typeof progressType
                          ]
                        }
                      </Chip>
                    </div>
                  ) : null}
                </div>
              </CardBody>
              <CardFooter className="py-0 text-sm text-gray-500">
                {time}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
