import { Card, CardHeader, cn } from "@nextui-org/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface CardNote {
   text: string;
   index: number;
}
const CardNote: React.FC<CardNote> = ({ text, index }) => {
   return (
      <Draggable draggableId={text} index={index} key={text}>
         {(provided) => (
            <div
               className="transition-colors duration-800 ease-out m-1 relative w-48 h-32"
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
            >
               <span
                  className={cn(
                     "absolute right-1 h-24 mt-[14px] dark:bg-red-400 w-[5px] z-50 rounded-md",
                     "bg-red-300"
                  )}
               ></span>
               <Card className="w-full h-full rounded-md ">
                  <CardHeader className="text-fontHeader py-2">
                     {text}
                  </CardHeader>
               </Card>
            </div>
         )}
      </Draggable>
   );
};

export default CardNote;
