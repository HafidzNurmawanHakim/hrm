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

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  return (
    <Droppable droppableId={id} key={id} direction="horizontal">
      {(provided) => (
        <div className="min-w-1/2 w-1/2 min-h-1/2 h-1/2 max-h-1/2 p-2 rounded-md">
          <Card shadow="none" className="bg-foreground" fullWidth>
            <CardHeader className="text-fontHeader">{id}</CardHeader>
            <CardBody className="h-full clear-both p-0">
              <div
                className="rounded-lg flex flex-wrap h-full w-full bg-red-200"
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
