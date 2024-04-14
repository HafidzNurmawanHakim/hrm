import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Components/DraggableNote/Column";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import FooterList from "../Components/DraggableNote/FooterList";

const KanbanNote = () => {
  const initialColumns = {
    todo: {
      id: "todo",
      list: ["item 1", "item 2", "item 3"],
    },
    doing: {
      id: "doing",
      list: ["item 4"],
    },
    done: {
      id: "done",
      list: [],
    },
    general: {
      id: "general",
      list: ["item 5"],
    },
  };
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId as keyof typeof initialColumns];
    const end = columns[destination.droppableId as keyof typeof initialColumns];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex ml-4 mt-2 gap-2 h-[90vh]">
        <div className="w-1/3 mt-2">
          <Card className="bg-foreground h-full" shadow="none">
            <CardBody className="">
              <Textarea className="h-96" />
            </CardBody>
            <CardFooter className="min-h-32 bg-red-200">
              {Object.values(columns).map((col) => {
                if (col.id !== "general") return null;
                return <FooterList col={col} key={col.id} />;
              })}
            </CardFooter>
          </Card>
        </div>
        <div className="w-2/3">
          <div className="w-full flex flex-wrap">
            {Object.values(columns).map((col) => {
              if (col.id === "general") return null;
              return <Column col={col} key={col.id} />;
            })}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanNote;
