import React, { useState } from "react";
import { Editor as DraftEditor, EditorState, RichUtils } from "draft-js";
import Toolbar from ".";

interface EditorPropsI {
   placeholder?: string;
}

export default function Editor({ placeholder = "" }: EditorPropsI) {
   const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
   );

   const handleKeyCommand = (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
         setEditorState(newState);
         return "handled";
      }

      return "not-handled";
   };
   return (
      <div className="bg-base h-96 w-full text-white">
         <div className="h-full">
            <DraftEditor
               placeholder={placeholder}
               handleKeyCommand={handleKeyCommand}
               onChange={setEditorState}
               editorState={editorState}
            />
         </div>
         <Toolbar
            editorState={editorState}
            updateEditorState={(editorState: EditorState) =>
               setEditorState(editorState)
            }
         />
      </div>
   );
}
