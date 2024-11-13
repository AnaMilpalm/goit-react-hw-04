import { Field, Form, Formik } from 'formik';
import s from './SearchBar.module.css';
const SearchBar = (initialValues) => {

    const handleSubmit = (values, actions) => {
        console.log(values);
        actions.resetForm();
    }
    
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={s.form}>
                <Field className={s.input} type="text" name="query" placeholder="Search images..." />
                <button className={s.button} type='button'>Search images</button>
            </Form>

        </Formik>
    )
}

export default SearchBar;