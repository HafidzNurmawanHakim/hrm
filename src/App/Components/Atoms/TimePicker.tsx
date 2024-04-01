import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { FC, Key, useState } from "react";

type Value = {
  hour: string;
  minute: string;
};

interface TimePickerProps {
  onChange: (value: Value) => void;
}

const TimePicker: FC<TimePickerProps> = ({ onChange }) => {
  const [value, setValue] = useState({
    hour: `${new Date().getHours()}`,
    minute: `${new Date().getMinutes()}`,
  });

  const selectedValue = React.useMemo(() => {
    onChange(value);
    return value;
  }, [value]);

  const generateHour = () => {
    let hour = [];
    for (let i = 1; i <= 24; i++) {
      if (i < 10) {
        hour.push({
          label: `0${i}`,
          key: `0${i}`,
        });
      } else {
        hour.push({
          label: `${i}`,
          key: `${i}`,
        });
      }
    }
    return hour;
  };
  const generateSecons = () => {
    let minute = [];
    for (let i = 0; i <= 59; i++) {
      if (i < 10) {
        minute.push({
          label: `0${i}`,
          key: `0${i}`,
        });
      } else {
        minute.push({
          label: `${i}`,
          key: `${i}`,
        });
      }
    }
    return minute;
  };
  return (
    <ButtonGroup>
      <Dropdown
        classNames={{
          base: "w-20",
          content: "min-w-[80px]",
        }}
        size="sm"
      >
        <DropdownTrigger>
          <Button variant="bordered" className="text-white">
            {selectedValue["hour"]}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="max-h-40  overflow-auto"
          items={generateHour()}
          onAction={(e) => setValue({ ...value, hour: e as string })}
        >
          {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        classNames={{
          base: "w-20",
          content: "min-w-[80px]",
        }}
        size="sm"
      >
        <DropdownTrigger>
          <Button variant="bordered" className="text-white">
            {selectedValue["minute"]}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="max-h-40 overflow-auto"
          items={generateSecons()}
          onAction={(e) => setValue({ ...value, minute: e as string })}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
};

export default TimePicker;
