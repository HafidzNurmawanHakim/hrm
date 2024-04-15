import React, { Dispatch, SetStateAction } from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import CardNote from "./CardNote";
import {
   KanbanNoteList,
   NoteColumn,
} from "../../Library/_types/KanbanNoteTypes";

interface ColumnProps {
   col: NoteColumn;
   column: KanbanNoteList;
   setColumn: Dispatch<SetStateAction<KanbanNoteList>>;
}

const FooterList: React.FC<ColumnProps> = ({
   col: { list, id },
   column,
   setColumn,
}) => {
   return (
      <Droppable direction="horizontal" droppableId={id} key={id}>
         {(provided) => (
            <div
               className="rounded-lg flex w-full h-full overflow-x-auto"
               {...provided.droppableProps}
               ref={provided.innerRef}
            >
               {list.length === 0 ? (
                  <div className="w-full h-full pt-6 text-center border-dashed border-2 rounded-lg border-gray-800">
                     <p className="text-fontBase">Empty</p>
                     <p className="text-fontBase">Drag Here!</p>
                  </div>
               ) : (
                  list.map((props, index) => (
                     <CardNote
                        {...props}
                        index={index}
                        key={index}
                        column={column}
                        setColumn={setColumn}
                     />
                  ))
               )}
               {provided.placeholder}
            </div>
         )}
      </Droppable>
   );
};

export default FooterList;
