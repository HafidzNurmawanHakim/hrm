import React from "react";
import { useAppController } from "../Core/AppController";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { AppDispatch } from "../Store";
import { useDispatch } from "react-redux";
import PlusIcon from "../../Assets/Icons/PlusIcon";
import { addNew } from "../Store/reducers/ScheduleReducers/ScheduleSlice";
import TimePicker from "./Atoms/TimePicker";
import DropdownOption from "./Atoms/DropdownOption";
import { status } from "../Library/_types/General";

const CreateTaskModal = () => {
  const { holdOn } = useAppController();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      {holdOn ? (
        <Button
          onPress={onOpen}
          size="sm"
          color="secondary"
          startContent={<PlusIcon />}
        >
          Task
        </Button>
      ) : (
        <Button
          onPress={onOpen}
          size="sm"
          color="secondary"
          startContent={<PlusIcon />}
          onClick={() => dispatch(addNew({}))}
        >
          Create Task
        </Button>
      )}
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="font-normal">Create New Task</ModalHeader>
              <ModalBody>
                <Input fullWidth size="sm" type="text" label="Title" />
                <Textarea
                  fullWidth
                  size="sm"
                  type="textarea"
                  label="Description"
                />
                <div className="flex w-full items-center gap-4 ">
                  <label
                    htmlFor="time"
                    className="w-fit flex items-center gap-4"
                  >
                    Date :
                    <Input size="sm" type="date" className="w-fit" />
                  </label>

                  <label
                    htmlFor="time"
                    className="w-fit flex items-center gap-4"
                  >
                    Time :
                    <TimePicker onChange={(e) => console.log({ e })} />
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <label
                    htmlFor="time"
                    className="w-fit flex items-center gap-4"
                  >
                    Status :
                    <DropdownOption
                      items={status}
                      onChange={(e) => console.log(e)}
                    />
                  </label>
                  <Input
                    fullWidth
                    size="sm"
                    type="text"
                    label="Task Key"
                    className="w-48"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button size="sm" color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button size="sm">Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
