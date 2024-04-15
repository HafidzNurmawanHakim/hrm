import { TextBold, TextItalic } from "iconsax-react";

export type InlineStyle = {
   label: string;
   value: string;
   icon: JSX.Element;
   type: "style" | "block";
};

export const inlineStyles: InlineStyle[] = [
   {
      label: "Bold",
      value: "BOLD",
      type: "style",
      icon: <TextBold />,
   },
   {
      label: "Italic",
      value: "ITALIC",
      icon: <TextItalic />,
      type: "style",
   },
];
