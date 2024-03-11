import React, { FC } from "react";

interface CircularProgressProps {
  color?: string;
  percent?: number;
}

const CircularProgress: FC<CircularProgressProps> = ({
  color = "red-700",
  percent = 90,
}) => {
  const circumference = 50 * 2 * Math.PI;

  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="flex items-center justify-center overflow-hidden rounded-full">
        <svg
          className="w-32 h-32 transform translate-x-1 translate-y-1"
          aria-hidden="true"
        >
          <circle
            className="text-white"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
          <circle
            className={`text-red-200`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={`${
              circumference - (percent / 100) * circumference
            }`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
        </svg>
        <span
          className={`absolute text-2xl text-${
            color === "blue" ? "blue-700" : "red-700"
          }`}
        >{`${percent}%`}</span>
      </div>
      <p className="text-gray-500">Development</p>
    </div>
  );
};

export default CircularProgress;
