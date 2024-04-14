import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import CardNote from "./CardNote";

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}

const FooterList: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  return (
    <Droppable direction="horizontal" droppableId={id} key={id}>
      {(provided) => (
        <div
          className="rounded-lg flex w-full h-full overflow-x-auto"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {list.map((text, index) => (
            <CardNote key={text} text={text} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FooterList;
