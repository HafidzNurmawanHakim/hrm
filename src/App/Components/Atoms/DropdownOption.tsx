import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ArrowDown3 } from "iconsax-react";
import React, { FC, Key, useState } from "react";
import { Status, status } from "../../Library/_types/General";

interface DropdownOption {
  items?: Array<{
    key: Status | Key;
    label: string;
    [key: string]: any;
  }>;
  onChange?: (value: Status) => void;
}

const DropdownOption: FC<DropdownOption> = ({
  items = [],
  onChange = () => {},
}) => {
  const [value, setValue] = useState("to_do");

  const selectedValue = React.useMemo(() => {
    const item = status.filter((item, i) => item.key === value)[0];

    onChange(item as Status);
    return item;
  }, [value]);

  return (
    <ButtonGroup variant="flat">
      <Button>{selectedValue.label}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <ArrowDown3 />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectedKeys={selectedValue.key}
          selectionMode="single"
          className="max-w-[300px]"
          items={items}
          onAction={(e) => setValue(e as string)}
        >
          {(items) => (
            <DropdownItem key={items.key as string}>{items.label}</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default DropdownOption;
