import React, { FC, useState } from "react";
import { IEvent } from "../../model/table";
import * as yup from "yup";
import { Field, Formik } from "formik";
import Button from "../Button";
import "./style.scss";

interface IProps {
  event: IEvent | null;
  closeModal: () => void;
  setEventData: any;
}

const schema = yup.object().shape({
  name: yup.string().required("Обязательное поле для заполнения").max(30, "Слишком большое"),
});

type TEvent = { name?: string; description?: string };
const EventEditor: FC<IProps> = ({ event, setEventData, closeModal }) => {
  const [isBooking, setBooking] = useState(false);
  const submitHandler = (
    values: TEvent,
    { setSubmitting }: { setSubmitting: (sub: boolean) => void }
  ) => {
    const { name, description } = values as TEvent;

    setEventData((prev: TEvent) => ({
      ...prev,
      name,
      description,
    }));

    setSubmitting(false);
    setBooking(true);

    setTimeout(() => {
      closeModal();
    }, 1500);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ name: event?.name, description: event?.description }}
      onSubmit={submitHandler}
    >
      {({ values, errors, touched, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={"form-edit"}>
          <Field
            type="text"
            name="name"
            value={values.name}
            className={"field-input"}
            placeholder={"Названия мероприятия"}
          />
          {errors.name && touched.name && <div className="error-text">{errors.name}</div>}

          <Field
            type="text"
            name="description"
            value={values.description}
            className={"field-input"}
            placeholder={"Описание мероприятия"}
          />

          {errors.description && touched.description && (
            <div className="error-text">{errors.description}</div>
          )}
          <Button type="submit" disabled={isSubmitting} className={"booking__button"}>
            Сохранить
          </Button>
          {isBooking && (
            <div className="success-text booking__success">
              Аудитория успешно забронирована с {event?.time![0]} до {event?.time![1]}
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default EventEditor;
