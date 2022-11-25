import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup'

const RecommendationsForm = (props) => {
    const{title, genre, onSubmitProp}=props;

    const valSchema = Yup.object().shape({

        title: Yup.string()
        .min(1,"Titulo muy corto")
        .required("Por favor ingresa tu recomendación"),

        genre: Yup.string()
        .min(1,"Genero muy breve")
        .required("Por favor ingresa el género de tu"),


    })
    return (
      <div>
            <Formik
                initialValues={{
                    title: title,
                    genre: genre,
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(values)}
                enableReinitialize
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <div>
                            <label htmlFor="title">Titulo de la película:</label>
                            <Field id="title" type="text" name="title" />
                            {errors.title && touched.title ? <p>{errors.title}</p> : null}
                        </div>

                        <div>
                            <label htmlFor="genre">Genero:</label>
                            <Field id="genre" type="genre" name="genre" />
                            {errors.genre && touched.genre ? (
                                <p>{errors.genre}</p>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            disabled={
                                Object.values(errors).length > 0 ||
                                Object.values(touched).length === 0
                            }
                        >
                            Enviar recomendación
                        </button>
                    </Form>
                )}
            </Formik>
      </div>
    );
}

export default RecommendationsForm;
