import React, { FC } from "react";
import EventEditor from "../../../../components/EventEditor";
import Modal from "../../../../components/Modal";
import { IEvent } from "../../../../model/table";

interface IProps {
  closeModal: () => void;
  event: IEvent | null;
  setEventData: (data: { name: string; description: string }) => void;
}

const ModalEventEditor: FC<IProps> = ({ closeModal, event, setEventData }) => {
  return (
    <div>
      <Modal title="Введите название мероприятия" onCloseModalHandler={closeModal}>
        <EventEditor event={event} setEventData={setEventData} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ModalEventEditor;
