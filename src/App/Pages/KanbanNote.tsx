import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Components/DraggableNote/Column";
import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   Textarea,
   Tooltip,
} from "@nextui-org/react";
import FooterList from "../Components/DraggableNote/FooterList";
import { Add, Trash } from "iconsax-react";
import { useDebounceInput } from "../Library/utils/debounceCallback";
import {
   KanbanNoteList,
   Note,
   NoteColumn,
} from "../Library/_types/KanbanNoteTypes";
import Editor from "../Components/DraftJs/Editor";
import NewGroupNoteModal from "../Components/Modal/NewGroupNoteModal";

const KanbanNote = () => {
   const initialColumns: KanbanNoteList = {
      todo: {
         id: "todo",
         title: "todo",
         list: [],
      },
      doing: {
         id: "doing",
         title: "doing",
         list: [],
      },
      done: {
         id: "done",
         title: "done",
         list: [],
      },
      general: {
         id: "general",
         title: "general",
         list: [],
      },
   };
   const [columns, setColumns] = useState<KanbanNoteList>(initialColumns);
   const [textInput, setTextInput] = useState<string | null>(null);
   const [currentNote, setCurrentNote] = useState("");
   const debounceInput = useDebounceInput(textInput || "", 2000);

   useEffect(() => {
      createNewNote();
   }, [debounceInput]);

   const createNewNote = () => {
      const col = Object.values(columns).filter(
         (item) => item.id === "general"
      )[0];
      const isExist =
         col.list.filter((item) => item.id === currentNote).length > 0;
      const newCol = [...col.list];
      if (textInput === null) return;
      if (newCol.length === 0 || !isExist) {
         const getTitle =
            textInput.split("\n").length > 0
               ? textInput.split("\n")[0].replace(/[^\w]/gi, "")
               : "";
         const getId = `${getTitle}_${new Date().getTime()}`;
         const newItem: Note = {
            id: getId,
            title: getTitle,
            note: textInput,
            timestamp: new Date().getTime(),
         };
         newCol.push(newItem);
         setCurrentNote(getId);
         setColumns((state) => ({
            ...state,
            general: { id: "general", title: "general", list: newCol },
         }));
      } else {
         const getList = col.list.filter((item) => item.id === currentNote)[0];
         const newList = { ...getList, note: textInput };
         const makeNewCol = col.list.filter((item) => item.id !== currentNote);
         makeNewCol.push(newList);
         setColumns((state) => ({
            ...state,
            general: { id: "general", title: "general", list: makeNewCol },
         }));
      }
   };

   const clear = () => {
      setTextInput(null);
      setCurrentNote("");
   };

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
      const end =
         columns[destination.droppableId as keyof typeof initialColumns];

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
            title: start.title,
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
            title: start.title,
         };

         // Make a new end list array
         const newEndList = end.list;

         // Insert the item into the end list
         newEndList.splice(destination.index, 0, start.list[source.index]);

         if (start.list[source.index].id === currentNote) clear();

         // Create a new end column
         const newEndCol = {
            id: end.id,
            list: newEndList,
            title: end.title,
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

   const handleAddGroupNote = (data: NoteColumn) => {
      const newId = data.title.replace(/[^\w]/gi, "");
      setColumns((state) => ({
         ...state,
         [data.title]: { ...data, id: newId },
      }));
   };

   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <div className="flex ml-4 gap-2 h-[90vh]">
            <div className="w-1/3 mt-2">
               <Card className="bg-foreground h-full" shadow="none">
                  <CardBody className="relative">
                     {/* <Editor /> */}
                     <Textarea
                        className=""
                        minRows={24}
                        maxRows={30}
                        onChange={(e) => setTextInput(e.target.value)}
                        value={textInput || ""}
                     />
                     <Button
                        radius="full"
                        size="lg"
                        isIconOnly
                        className="absolute right-10 bottom-10"
                        color="danger"
                        onClick={clear}
                     >
                        <Trash />
                     </Button>
                  </CardBody>
                  <CardFooter className="min-h-32">
                     {Object.values(columns).map((col) => {
                        if (col.id !== "general") return null;
                        return (
                           <FooterList
                              col={col}
                              key={col.id}
                              column={columns}
                              setColumn={setColumns}
                           />
                        );
                     })}
                  </CardFooter>
               </Card>
            </div>
            <div className="w-2/3 relative">
               <div className="w-full flex flex-wrap">
                  {Object.values(columns).map((col) => {
                     if (col.id === "general") return null;
                     return (
                        <Column
                           col={col}
                           key={col.id}
                           column={columns}
                           setColumn={setColumns}
                        />
                     );
                  })}
               </div>
               <Tooltip content="New Group">
                  <div className="absolute right-10 bottom-10">
                     <NewGroupNoteModal onSave={handleAddGroupNote} />
                  </div>
               </Tooltip>
            </div>
         </div>
      </DragDropContext>
   );
};

export default KanbanNote;
