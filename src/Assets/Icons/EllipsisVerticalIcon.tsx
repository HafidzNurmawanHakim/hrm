import * as React from "react";
import { SVGProps } from "react";
const EllipsisVerticalIcon = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="w-6 h-6"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
   >
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 6a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 6a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
   </svg>
);
export default EllipsisVerticalIcon;
