import { Field, Form, Formik } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import css from "./FilterComponent.module.css";
import { changeFilter } from "../../redux/filter/filterSlice";
import { fetchTeachersInfo } from "../../redux/teachers/operations";

export const FilterComponent = () => {
  const dispatch = useDispatch();

  const languages = [
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Mandarin Chinese", label: "Mandarin Chinese" },
    { value: "French", label: "French" },
    { value: "Italian", label: "Italian" },
    { value: "Korean", label: "Korean" },
    { value: "Vietnamese", label: "Vietnamese" },
  ];

  const levels = [
    { value: "A1 Beginner", label: "A1 Beginner" },
    { value: "A2 Elementary", label: "A2 Elementary" },
    { value: "B1 Intermediate", label: "B1 Intermediate" },
    { value: "B2 Upper-Intermediate", label: "B2 Upper-Intermediate" },
    { value: "C1 Advanced", label: "C1 Advanced" },
    { value: "C2 Proficient", label: "C2 Proficient" },
  ];

  const price_per_hour = [
    { value: "10", label: "10 $" },
    { value: "20", label: "20 $" },
    { value: "30", label: "30 $" },
    { value: "40", label: "40 $" },
  ];

  const languageFieldId = useId();
  const knowledgeFieldId = useId();
  const priceFieldId = useId();

  const initialValues = {
    languages: "",
    levels: "",
    price_per_hour: "",
  };

  const handleSubmit = (values) => {
    dispatch(changeFilter(values));
    dispatch(fetchTeachersInfo({ filters: values }));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, handleSubmit }) => {
        return (
          <Form className={css.form}>
            <div className={css.container}>
              <label htmlFor={languageFieldId}>Languages</label>
              <Field
                as="select"
                name="languages"
                id={languageFieldId}
                className={css.field}
                onChange={(e) => {
                  handleChange(e);
                  handleSubmit();
                }}
              >
                {languages.map((language, index) => (
                  <option
                    key={`${language.value}-${index}`}
                    value={language.value}
                    className={
                      values.languages === language.value
                        ? css.activeOption
                        : css.greyOption
                    }
                  >
                    {language.label}
                  </option>
                ))}
              </Field>
            </div>

            <div className={css.container}>
              <label htmlFor={knowledgeFieldId}>Level of knowledge</label>
              <Field
                as="select"
                name="levels"
                id={knowledgeFieldId}
                className={css.field}
                onChange={(e) => {
                  handleChange(e);
                  handleSubmit();
                }}
              >
                {levels.map((level) => (
                  <option
                    key={level.value}
                    value={level.value}
                    className={
                      values.levels === level.value
                        ? css.activeOption
                        : css.greyOption
                    }
                  >
                    {level.label}
                  </option>
                ))}
              </Field>
            </div>

            <div className={css.container}>
              <label htmlFor={priceFieldId}>Price</label>
              <Field
                as="select"
                name="price_per_hour"
                id={priceFieldId}
                className={css.field}
                onChange={(e) => {
                  handleChange(e);
                  handleSubmit();
                }}
              >
                {price_per_hour.map((price) => (
                  <option
                    key={price.value}
                    value={price.value}
                    className={
                      price.value === values.price
                        ? css.activeOption
                        : css.greyOption
                    }
                  >
                    {price.label}
                  </option>
                ))}
              </Field>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
