import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
  Tooltip,
  cn,
} from "@nextui-org/react";
import React, { FC, useState } from "react";
import Timeline from "../Timeline/Timeline";
import TimelineItem from "../Timeline/TimelineItem";
import {
  Book,
  MenuBoard,
  Message,
  MessageAdd,
  MessageAdd1,
  UserSquare,
} from "iconsax-react";

interface VerticalAccorProps {
  title?: string;
}

const VerticalAccor: FC<VerticalAccorProps> = ({ title = "" }) => {
  const [activePaneIndex, setActivePaneIndex] = useState(0);

  const handleClick = (index: number) => {
    const panesElements = document.querySelectorAll(".pane");
    panesElements[activePaneIndex].classList.remove("active");
    setActivePaneIndex(index);
    panesElements[index].classList.add("active");
  };

  const dataAccor = [
    {
      user: "Hafidz",
      type: "update_task",
      comment: null,
      progressBefore: "to_do",
      updateProgress: "in_progress",
      time: "08:00 AM",
      date: "2001-08-23",
    },
    {
      user: "Hafidz",
      type: "comment_task",
      comment: "Hafidz ganteng",
      progressBefore: null,
      updateProgress: null,
      time: "07:00 AM",
      date: "2024-03-11",
    },
  ];

  const ava = [
    "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a04258114e29026302d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
    "https://i.pravatar.cc/150?u=a04258114e29026708c",
  ];

  return (
    <Card shadow="none" className="w-full bg-base rounded-md shadow-none">
      <CardHeader className="rounded-md bg-white justify-between">
        <h1 className="">{title}</h1>
        <Link size="sm" isExternal href="">
          View All
        </Link>
      </CardHeader>
      <CardBody className="px-1">
        <div className="flex gap-4 h-100 ">
          {ava.map((item, index) => {
            let isActive = activePaneIndex === index;

            return (
              <Card
                isHoverable
                isPressable
                className={cn(
                  "pane bg-white rounded-xl delay-0 outline-none w-24 shadow-none overflow-hidden",
                  index === 0 && "active"
                )}
                onPress={() => handleClick(index)}
              >
                <CardHeader className="pl-[1.2rem] justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar src={item} size="lg" />
                    <div
                      className={cn(
                        "overflow-hidden ml-2 custom-transition",
                        isActive ? "w-30" : "w-0 delay-150 hidden"
                      )}
                    >
                      <p>Hafidz Hakim</p>
                      <Chip
                        size="sm"
                        className="text-sm"
                        variant="flat"
                        color="primary"
                      >
                        Frontend Dev
                      </Chip>
                    </div>
                    {isActive ? (
                      <div className="flex self-start items-center pt-1 gap-2">
                        <p className="text-sm italic text-desc text-gray-400">
                          Just Update
                        </p>
                        <Chip
                          size="sm"
                          className="rounded-md text-sm font-sans"
                        >
                          TaSK-2
                        </Chip>
                      </div>
                    ) : null}
                  </div>
                  <div className="self-start">
                    {isActive ? (
                      <Chip
                        size="md"
                        className="rounded-md text-sm font-sans"
                        variant="flat"
                        color="secondary"
                      >
                        In Progress
                      </Chip>
                    ) : null}
                  </div>
                </CardHeader>
                <CardBody>
                  {isActive ? (
                    <>
                      <div className="text-desc text-md p-2 text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Aliquam maiores molestias nobis quas voluptatum
                        sint similique, recusandae harum excepturi nostrum?
                      </div>
                      <div className="w-4/5">
                        <Timeline>
                          {dataAccor.map((props, i) => {
                            return <TimelineItem {...props} />;
                          })}
                        </Timeline>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Tooltip content="title">
                        <Button isIconOnly variant="light" color="secondary">
                          <UserSquare size={32} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="title">
                        <Button isIconOnly variant="light" color="primary">
                          <MenuBoard size={28} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="title">
                        <Button isIconOnly variant="light" color="danger">
                          <Message size={28} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="title">
                        <Button isIconOnly variant="light" color="success">
                          <MessageAdd1 size={28} />
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default VerticalAccor;
