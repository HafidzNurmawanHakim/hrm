import React, { ChangeEvent, useState } from "react";
import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   useDisclosure,
} from "@nextui-org/react";
import PlusIcon from "../../../Assets/Icons/PlusIcon";
import { NoteColumn } from "../../Library/_types/KanbanNoteTypes";

interface ModalProps {
   onSave: (data: NoteColumn) => void;
}

const initial = { title: "", id: "", desc: "", list: [] };

const NewGroupNoteModal = ({ onSave }: ModalProps) => {
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const [data, setData] = useState(initial);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setData((state) => ({ ...state, [e.target.name]: e.target.value }));
   };

   return (
      <div>
         <Button
            onPress={onOpen}
            size="lg"
            radius="full"
            color="secondary"
            isIconOnly
         >
            <PlusIcon />
         </Button>

         <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {() => (
                  <>
                     <ModalHeader className="font-normal">
                        New Group Note
                     </ModalHeader>
                     <ModalBody>
                        <Input
                           fullWidth
                           size="sm"
                           type="text"
                           label="Title"
                           name="title"
                           onChange={handleChange}
                        />
                        <Input
                           fullWidth
                           size="sm"
                           type="text"
                           label="Description"
                           name="desc"
                           onChange={handleChange}
                        />
                     </ModalBody>
                     <ModalFooter>
                        <Button size="sm" color="danger" onPress={onClose}>
                           Close
                        </Button>
                        <Button
                           size="sm"
                           onClick={() => {
                              onSave(data);
                              setData(initial);
                              onClose();
                           }}
                        >
                           Save
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </div>
   );
};

export default NewGroupNoteModal;
