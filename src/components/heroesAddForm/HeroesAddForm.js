import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

import { heroCreating, heroCreated, heroCreatingError } from "../../actions";

import { v4 as uuidv4 } from "uuid";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";

import Spinner from "../spinner/Spinner";

const HeroesAddForm = () => {
  const { filtersArr, loadingStatus: filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  return (
    <Formik
      initialValues={{ name: "", text: "", element: "Я владею элементом..." }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Должно быть хотя бы 3 символа")
          .max(16, "Должно быть не более 16 символов")
          .required("Обязательное поле"),
        text: Yup.string()
          .min(3, "Должно быть хотя бы 3 символа")
          .max(48, "Должно быть не более 48 символов")
          .required("Обязательное поле"),
        element: Yup.string().oneOf(
          ["fire", "water", "wind", "earth"],
          "Выберите одно из значений"
        ),
      })}
      onSubmit={({ name, text, element }, { resetForm }) => {
        const newHero = {
          id: uuidv4(),
          name: name,
          description: text,
          element: element,
        };
        dispatch(heroCreating());
        request(`http://localhost:3001/heroes`, "POST", JSON.stringify(newHero))
          .then(() => {
            resetForm();
            dispatch(heroCreated(newHero));
          })
          .catch(() => dispatch(heroCreatingError()));
      }}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
          />
          <FormikErrorMessage
            component="div"
            name="name"
            style={{ color: "red" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Описание
          </label>
          <Field
            as="textarea"
            required
            name="text"
            className="form-control"
            id="text"
            placeholder="Что я умею?"
            style={{ height: "130px" }}
          />
          <FormikErrorMessage
            component="div"
            name="text"
            style={{ color: "red" }}
          />
        </div>

        <div className="mb-3">
          {filtersLoadingStatus === "fetching" ? (
            <Spinner />
          ) : (
            <>
              <label htmlFor="element" className="form-label">
                Выбрать элемент героя
              </label>
              <Field
                as="select"
                required
                className="form-select"
                id="element"
                name="element"
                disabled={filtersLoadingStatus === "fetch-error"}
              >
                <option>Я владею элементом...</option>
                {filtersArr
                  .filter((item) => item.name !== "all")
                  .map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.label}
                    </option>
                  ))}
              </Field>
            </>
          )}
          <FormikErrorMessage
            component="div"
            name="element"
            style={{ color: "red" }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
