import { Divider } from "@nextui-org/react";
import React, { FC } from "react";
import TimelineDate from "./TimelineDate";

interface Timeline {
  children: JSX.Element[];
}

const Timeline: FC<Timeline> = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      {children.map((item, i) => {
        return <div key={i}>{item}</div>;
      })}
    </div>
  );
};

export default Timeline;
