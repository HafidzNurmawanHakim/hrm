import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { MessageText } from "iconsax-react";
import React from "react";

const TaskTrackerSchedule = () => {
  return (
    <div className="w-full h-full bg-white p-4 rounded-xl flex flex-col">
      <div className="mb-6">Highlighted Tasks</div>
      <div id="task-highlight" className="">
        <Card
          isHoverable
          className="bg-red-50 rounded-md h-36 relative shadow-none cursor-pointer"
        >
          <span className="absolute right-2 h-4/5 bg-red-300 rounded w-2 block top-[12px]"></span>
          <CardHeader className="gap-2 justify-between pr-8">
            <div className="flex gap-2">
              <h3>Design Mockup</h3>
              <Chip size="sm" color="primary" variant="flat">
                Aug, 23 2001
              </Chip>
            </div>
            <div>
              <Chip size="sm" className="rounded-md text-sm font-sans">
                TaSK-2
              </Chip>
            </div>
          </CardHeader>

          <CardBody className="text-md py-1 flex gap-2">
            <div className="w-full h-full flex">
              <p className="max-w-80 line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                laudantium.akwdjakwdj
              </p>
              <div>
                {/* <Image
                  width={40}
                  height={20}
                  src=""
                  className="bg-repeat-none"
                  fallbackSrc="https://via.placeholder.com/40x40"
                  alt="NextUI Image with fallback"
                /> */}
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0 gap-2">
            <div className="flex justify-between gap-2 items-center">
              <Button
                variant="light"
                size="sm"
                color="secondary"
                startContent={<MessageText size="24" />}
                className="text-secondary"
              >
                26
              </Button>
            </div>
            <Divider orientation="vertical" className="h-4/5" />
            <div className="flex">
              <Avatar
                className="w-6 h-6 text-tiny cursor-pointer"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
              <Avatar
                className="w-6 h-6 text-tiny cursor-pointer"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TaskTrackerSchedule;
