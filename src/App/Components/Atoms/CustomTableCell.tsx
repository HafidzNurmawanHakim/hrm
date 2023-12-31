import { TableCellProps, getKeyValue } from "@nextui-org/react";
import { Key } from "react";

interface CustomTableCellProps {
   item: Record<string, any>;
   columnKey: Key;
}

const CustomTableCell = (props: CustomTableCellProps) => {
   const { item, columnKey } = props;
   const cellValue = item[columnKey as string];
   return (
      <div className="flex flex-col">
         <p className="text-bold text-small capitalize">{cellValue}</p>
      </div>
   );
};

export default CustomTableCell;
