import React from "react";
import { FC } from "react";
import "./style.scss";
interface IProps {
  children: any;
  title: string;
  onCloseModalHandler: () => void;
}

const Modal: FC<IProps> = ({ children, title, onCloseModalHandler }) => {
  return (
    <div className={"modal"}>
      <div className={"modal__overlay"} onClick={onCloseModalHandler}>
        <div className={"modal-window"} onClick={(e) => e.stopPropagation()}>
          <button onClick={onCloseModalHandler} className={"modal__close"}>
            ✖
          </button>
          <h3 className="modal__title">{title}</h3>
          <div className="modal__body"> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
