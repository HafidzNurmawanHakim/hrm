import * as React from "react";
import { SVGProps } from "react";
const UserMinusIcon = (props: SVGProps<SVGSVGElement>) => (
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
         d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21C8.043 21 5.862 20.355 4 19.234Z"
      />
   </svg>
);
export default UserMinusIcon;
