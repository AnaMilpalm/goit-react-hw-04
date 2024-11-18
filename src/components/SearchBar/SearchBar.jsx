import { Field, Form, Formik } from 'formik';
import s from './SearchBar.module.css';
const SearchBar = ({onSearch}) => {

    const handleSubmit = (values, actions) => {
        onSearch(values.query)
        actions.resetForm();
    }
    
    return (
        <header className={s.header}>
        <Formik initialValues={{ query: ''}} onSubmit={handleSubmit}>
            <Form className={s.form}>
                <Field className={s.input} type="text" name="query" placeholder="Search images..." />
                <button className={s.button} type='submit'>Search images</button>
            </Form>
        </Formik>
        </header>
    )
}

export default SearchBar;