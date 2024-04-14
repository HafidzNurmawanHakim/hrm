import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import CardNote from "./CardNote";

interface ColumnProps {
   col: {
      id: string;
      list: string[];
   };
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
   return (
      <Droppable droppableId={id} key={id} direction="horizontal">
         {(provided) => (
            <div className="min-w-1/2 w-1/2 min-h-1/2 h-1/2 max-h-1/2 p-2 rounded-md">
               <Card shadow="none" className="bg-foreground" fullWidth>
                  <CardHeader className="text-fontHeader flex-col items-start">
                     <Input
                        placeholder="Title"
                        value={id}
                        size="sm"
                        contentEditable="true"
                     />
                     <Input
                        placeholder="Description"
                        variant="bordered"
                        classNames={{
                           inputWrapper: [
                              "border-transparent",
                              "focus-visible:outline-none mt-2",
                           ],
                        }}
                     />
                  </CardHeader>
                  <CardBody className="h-full clear-both py-0 px-1 ">
                     <div
                        className="rounded-lg flex flex-col flex-wrap flext-start justify-start h-[17.7rem] w-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                     >
                        {list.map((text, index) => (
                           <CardNote key={text} text={text} index={index} />
                        ))}
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
