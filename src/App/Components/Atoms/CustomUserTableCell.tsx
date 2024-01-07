import React, { Key } from "react";
import { User as UserType } from "../../Library/_types/General";
import { User } from "@nextui-org/react";

interface CustomUserTableCellProps {
  item: Record<string, any>;
  columnKey: Key;
}

const CustomUserTableCell = (props: CustomUserTableCellProps) => {
  const { item, columnKey } = props;
  const cellValue = item[columnKey as string];
  return (
    <User
      avatarProps={{ radius: "full", size: "sm", src: item.avatar }}
      classNames={{
        description: "text-default-500",
      }}
      description={item.email}
      name={cellValue}
    >
      {item.email}
    </User>
  );
};

export default CustomUserTableCell;
