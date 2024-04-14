import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface ItemProps {
  text: string;
  index: number;
}
const Item: React.FC<ItemProps> = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index} key={text}>
      {(provided) => (
        <div
          className="bg-gray-200 rounded-md p-2 transition-colors duration-800 ease-out mt-4 hover:bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
