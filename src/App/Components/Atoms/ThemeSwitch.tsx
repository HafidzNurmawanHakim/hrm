import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { Moon, Sun1 } from "iconsax-react";
import { useEffect } from "react";
import { useAppController } from "../../Core/AppController";

export const ThemeSwitch = (props: any) => {
  const { themeToggle } = useAppController();
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  useEffect(() => {
    themeToggle();
  }, [isSelected]);

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "w-12 h-12",
            "flex items-center justify-center",
            "rounded-lg bg-default-100 hover:bg-default-200",
          ],
        })}
      >
        {isSelected ? <Sun1 /> : <Moon />}
      </div>
    </Component>
  );
};
