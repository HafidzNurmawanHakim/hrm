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
  Progress,
  Tooltip,
  cn,
} from "@nextui-org/react";
import DonutCharts from "../Charts/DonutCharts";
import CircularProgress from "./CircularProgress";
import { Clock, ForwardItem } from "iconsax-react";
import ColumnChart from "../Charts/ColumnChart";
import LineChart from "../Charts/LineChart";

interface ProjectStatsProps {
  title: string;
  colorType?: "danger" | "success" | "default";
  chartType?: "bar" | "line";
  status: string;
  totalTask?: number;
  daysLeft?: number;
}

const bgColor = {
  danger: "bg-gradient-to-r from-foreground to-rose-100",
  success: "bg-gradient-to-r from-foreground to-emerald-900",
  default: "bg-foreground",
};

export const ProjectStats = (props: ProjectStatsProps) => {
  const {
    title,
    colorType = "default",
    status,
    chartType = "bar",
    totalTask,
    daysLeft,
  } = props;
  return (
    <Card
      className={cn(
        "shadow-none hover:border-secondary",
        bgColor[colorType as keyof typeof bgColor]
      )}
    >
      <CardHeader className="px-6 pt-6 pb-0 justify-between">
        <p className="text-xl text-fontHeader">{title}</p>
        <Chip
          size="md"
          className="rounded-md text-sm font-sans"
          variant="flat"
          color="secondary"
        >
          {status}
        </Chip>
      </CardHeader>
      <CardBody className="flex flex-row gap-2 pb-1 overflow-hidden">
        <div className="w-52 flex flex-col px-4 gap-4">
          <div className="flex gap-2">
            <ForwardItem size="24" className="text-gray-400" />
            <span className="text-fontBase">{totalTask} Tasks</span>
          </div>
          <div className="flex gap-2">
            <Clock size="24" className="text-gray-400" />
            <span className="text-fontBase">{daysLeft} Days Left</span>
          </div>
          <div className="w-fit mt-2 mb-2">
            <Tooltip content="Participants" placement="bottom">
              <AvatarGroup isBordered size="sm" max={4}>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </AvatarGroup>
            </Tooltip>
          </div>
          {/* <Progress
            size="sm"
            label="Progress"
            aria-label="Progress"
            value={48}
            valueLabel="48%"
            showValueLabel
          /> */}
        </div>

        <div className="grow">
          {chartType === "bar" ? <ColumnChart /> : <LineChart />}
        </div>
      </CardBody>
    </Card>
  );
};
