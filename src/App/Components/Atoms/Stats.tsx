import React, { ReactElement, ReactNode } from "react";
import ChartStatIcon from "../../../Assets/Icons/ChartStatsIcon";
import ArrowStatUpicon from "../../../Assets/Icons/ArrowStatUpIcon";
import { Chip } from "@nextui-org/chip";

interface StatsProps {
   label: string;
   type?: "success" | "warning";
   icon?: ReactElement;
   bottomContent?: () => ReactElement;
   status?: string;
   summary: string | number;
}

export const Stats = (props: StatsProps) => {
   const { label, type, icon, bottomContent, status, summary } = props;
   return (
      <article className="rounded-lg shadow-sm hover:border-secondary my-1 p-4">
         <div className="flex items-center justify-between">
            <div>
               <p className="text-sm text-gray-500">{label}</p>
               <div className="flex items-center gap-2">
                  <p className="text-2xl font-medium text-secondary">{summary}</p>
                  {status && (
                     <Chip size="sm" color={type} variant="bordered">
                        {status}
                     </Chip>
                  )}
               </div>
            </div>

            <span className="rounded-full text-secondary mr-2">{icon}</span>
         </div>
         {bottomContent && bottomContent()}
      </article>
   );
};
