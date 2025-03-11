import { Field, Form, Formik } from "formik";
import { useId } from "react";
import { useSelector } from "react-redux";
import { selectTeachers } from "../../redux/teachers/selectors";
import css from "./FilterComponent.module.css";
// import Icon from "../Icon/Icon";

export const FilterComponent = () => {
  const teachers = useSelector(selectTeachers);
  const uniqueLanguages = [
    ...new Set(teachers.flatMap((teacher) => teacher.languages)),
  ];

  const languageFieldId = useId();
  const knowledgeFieldId = useId();
  const priceFieldId = useId();

  const initialValues = {
    language: "French",
    knowledge: "beginner",
    price: "30",
  };
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.container}>
          <label htmlFor={languageFieldId}>Languages</label>
          <Field
            as="select"
            name="language"
            id={languageFieldId}
            className={css.field}
          >
            {uniqueLanguages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </Field>
          {/* <Icon id="icon-select" width={20} height={20} className={css.icon} /> */}
        </div>

        <div className={css.container}>
          <label htmlFor={knowledgeFieldId}>Level of knowledge</label>
          <Field
            as="select"
            name="knowledge"
            id={knowledgeFieldId}
            className={css.field}
          >
            <option value="beginner">A1 Beginner</option>
            <option value="elementary">A2 Elementary</option>
            <option value="intermediate">B1 Intermediate</option>
            <option value="upperInterm">B2 Upper-Intermediate</option>
            <option value="advanced">C1 Advanced</option>
            <option value="proficient">C2 Proficient</option>
          </Field>
          {/* <Icon id="icon-select" width={20} height={20} className={css.icon} /> */}
        </div>

        <div className={css.container}>
          <label htmlFor={priceFieldId}>Price</label>
          <Field
            as="select"
            name="price"
            id={priceFieldId}
            className={css.field}
          >
            <option value="10">10 $</option>
            <option value="20">20 $</option>
            <option value="30">30 $</option>
            <option value="40">40 $</option>
          </Field>
          {/* <Icon id="icon-select" width={20} height={20} className={css.icon} /> */}
        </div>
      </Form>
    </Formik>
  );
};
