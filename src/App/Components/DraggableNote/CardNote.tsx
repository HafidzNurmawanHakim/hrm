import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   cn,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   Textarea,
   useDisclosure,
} from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { KanbanNoteList, Note } from "../../Library/_types/KanbanNoteTypes";
import { generateTimestamps } from "../../Library/utils/helper";
import { useDebounceInput } from "../../Library/utils/debounceCallback";

type CardNote = {
   index: number;
   column: KanbanNoteList;
   setColumn: Dispatch<SetStateAction<KanbanNoteList>>;
} & Note;
const CardNote: React.FC<CardNote> = ({
   id,
   index,
   title,
   note,
   timestamp,
   column,
   setColumn,
}) => {
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const [textInput, setTextInput] = useState<string | undefined>(note);
   const [noteTitle, setNoteTitle] = useState<string | undefined>(title);
   const debounceInput = useDebounceInput(textInput || "", 2000);
   const debounceTitle = useDebounceInput(noteTitle || "", 2000);

   useEffect(() => {
      editNote();
   }, [debounceInput, debounceTitle]);

   const editNote = () => {
      const getObj = Object.values(column).filter((item) => {
         return item.list.some((itemNote) => itemNote.id === id);
      });

      const list = getObj[0].list.filter((note) => note.id === id)[0];
      if (list) {
         const newObj: Note = {
            ...list,
            title: noteTitle || "",
            note: textInput || "",
         };
         setColumn((state) => ({
            ...state,
            [getObj[0].id]: {
               ...getObj[0],
               list: getObj[0].list.map((item) =>
                  item.id === id ? newObj : item
               ),
            },
         }));
      }
   };

   return (
      <Draggable draggableId={id} index={index} key={id}>
         {(provided) => (
            <div
               className="transition-colors duration-800 ease-out m-1 relative w-48 h-32"
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               onClick={onOpen}
            >
               <span
                  className={cn(
                     "absolute right-1 h-24 mt-[14px] dark:bg-red-400 w-[5px] z-50 rounded-md",
                     "bg-red-300"
                  )}
               ></span>
               <Card className="w-full h-full rounded-md shadow-none bg-base">
                  <CardHeader className="text-fontHeader py-1 ">
                     <p className="truncate w-40">{title}</p>
                  </CardHeader>
                  <CardBody className="py-0">
                     <p className="text-fontBase text-md">{note}</p>
                  </CardBody>
                  <CardFooter className="pb-1 pt-0 text-sm text-time">
                     {generateTimestamps(timestamp)}
                  </CardFooter>
               </Card>

               <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                     {() => (
                        <>
                           <ModalHeader className="font-normal mt-4">
                              <Input
                                 placeholder="Title"
                                 defaultValue={title}
                                 size="sm"
                                 onChange={(e) => setNoteTitle(e.target.value)}
                                 required
                              />
                           </ModalHeader>
                           <ModalBody>
                              <Textarea
                                 className=""
                                 minRows={24}
                                 maxRows={30}
                                 onChange={(e) => setTextInput(e.target.value)}
                                 defaultValue={note || ""}
                              />
                           </ModalBody>
                           <ModalFooter>
                              <Button
                                 size="sm"
                                 color="danger"
                                 onPress={onClose}
                              >
                                 Close
                              </Button>
                              {/* <Button size="sm">Save</Button> */}
                           </ModalFooter>
                        </>
                     )}
                  </ModalContent>
               </Modal>
            </div>
         )}
      </Draggable>
   );
};

export default CardNote;
