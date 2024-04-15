import React, { Dispatch, SetStateAction } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
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

const Column: React.FC<ColumnProps> = ({
   col: { list, id, desc, title },
   column,
   setColumn,
}) => {
   return (
      <Droppable droppableId={id} key={id} direction="horizontal">
         {(provided) => (
            <div className="min-w-1/2 w-1/2 min-h-1/2 h-1/2 max-h-1/2 p-2 rounded-md">
               <Card shadow="none" className="bg-foreground" fullWidth>
                  <CardHeader className="text-fontHeader flex-col items-start">
                     <Input
                        placeholder="Title"
                        value={title}
                        size="sm"
                        contentEditable="true"
                     />
                     <Input
                        placeholder="Description"
                        variant="bordered"
                        classNames={{
                           inputWrapper: [
                              "border-transparent",
                              "focus-visible:outline-none mt-2 shadow-none",
                           ],
                        }}
                        value={desc}
                     />
                  </CardHeader>
                  <CardBody className="h-full clear-both py-0 px-1 ">
                     <div
                        className="rounded-lg flex flex-col flex-wrap flext-start justify-start h-[17.7rem] w-auto p-1"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                     >
                        {list.length === 0 ? (
                           <div className="w-full h-full pt-10 text-center border-dashed border-2 rounded-lg border-gray-800">
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
                  </CardBody>
               </Card>
            </div>
         )}
      </Droppable>
   );
};

export default Column;
