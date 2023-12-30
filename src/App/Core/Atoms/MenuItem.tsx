import React, { ReactNode } from "react";

interface MenuItemProps {
   children: ReactNode;
}

const MenuItem = (props: MenuItemProps) => {
   const { children } = props;

   return (
      <>
         <li>
            <a
               href=""
               className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
               {children}
            </a>
         </li>
      </>
   );
};

export default MenuItem;
