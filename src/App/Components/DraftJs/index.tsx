import React from "react";
import { EditorState, RichUtils } from "draft-js";
import { Button } from "@nextui-org/react";
import { InlineStyle, inlineStyles } from "./Constant";

interface ToolbarPropsI {
   editorState: EditorState;
   updateEditorState(editorState: EditorState): void;
}

const Toolbar = ({ editorState, updateEditorState }: ToolbarPropsI) => {
   const applyStyle = (style: InlineStyle) => {
      if (style.type === "style") {
         updateEditorState(
            RichUtils.toggleInlineStyle(editorState, style.value)
         );
      }
      if (style.type === "block") {
         updateEditorState(RichUtils.toggleBlockType(editorState, style.value));
      }
   };

   const isActive = (style: InlineStyle) => {
      if (style.type === "style") {
         const currentInlineStyle = editorState.getCurrentInlineStyle();
         console.log(currentInlineStyle);
         return currentInlineStyle.has(style.value);
      }

      if (style.type === "block") {
         const currentBlock = editorState.getBlockTree("ordered-list");
         console.log(currentBlock);
         // return currentInlineStyle.has(style.value);
      }
      return false;
   };

   return (
      <div>
         {inlineStyles.map((style: InlineStyle) => (
            <Button
               className={isActive(style) ? "active" : ""}
               onClick={() => applyStyle(style)}
            >
               {style.icon}
            </Button>
         ))}
      </div>
   );
};

export default Toolbar;
