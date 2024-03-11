import React, { ReactElement, ReactNode } from "react";
import ChartStatIcon from "../../../Assets/Icons/ChartStatsIcon";
import ArrowStatUpicon from "../../../Assets/Icons/ArrowStatUpIcon";
import { Chip } from "@nextui-org/chip";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import DonutCharts from "../Charts/DonutCharts";
import CircularProgress from "./CircularProgress";
import { Clock, ForwardItem } from "iconsax-react";

interface ProjectStatsProps {
  title: string;
  type?: "success" | "warning";
  icon?: ReactElement;
  bottomContent?: () => ReactElement;
  status?: string;
  summary: string | number;
}

export const ProjectStats = (props: ProjectStatsProps) => {
  const { title, type, icon, bottomContent, status, summary } = props;
  return (
    <Card className="shadow-none hover:border-secondary ">
      <CardHeader className="px-6 pt-6 pb-0 justify-between">
        <p className="text-xl text-gray-600">{title}</p>
        <Chip
          size="md"
          className="rounded-md text-sm font-sans"
          variant="flat"
          color="secondary"
        >
          On Going
        </Chip>
      </CardHeader>
      <CardBody className="flex flex-row gap-2 ">
        <div className="w-48 px-4 ">
          <div className="flex mb-4 gap-2">
            <ForwardItem size="24" className="text-gray-400" />
            <span className=" ">165 Tasks</span>
          </div>
          <div className="flex mb-4 gap-2">
            <Clock size="24" className="text-gray-400" />
            <span className=" ">165 Days Left</span>
          </div>
        </div>

        <div className="grow ">
          <CircularProgress color="red-200" />
        </div>
      </CardBody>
      <CardFooter className="pl-6">
        <div className="w-fit">
          <AvatarGroup isBordered size="md" max={4}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </AvatarGroup>
        </div>
      </CardFooter>
    </Card>
  );
};
