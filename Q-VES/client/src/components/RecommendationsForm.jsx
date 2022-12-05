import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';

const RecommendationsForm = (props) => {
    const{title, genre,userId, onSubmitProp}=props;

    const valSchema = Yup.object().shape({

        title: Yup.string()
        .min(1,"Titulo muy corto")
        .required("Por favor ingresa tu recomendación"),

        genre: Yup.string()
        .min(1,"Genero muy breve")
        .required("Por favor ingresa el género de tu recomendacion"),


    })
    return (
      <div>
            <Formik
                initialValues={{
                    title: title,
                    genre: genre,
                    userId: userId,
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(values)}
                enableReinitialize
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='row d-flex align-items-center justify-content-center shadow-sm p-3 mb-5 border rounded'>

                            <div className='col-4'>
                                <div className='form-group mt-4'>
                                    <Field id="title" placeholder="título de la película" type="text" name="title" className="form-control" />
                                    {errors.title && touched.title ? <p>{errors.title}</p> : null}
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group mt-4'>
                                    <Field id="genre" placeholder="género de la película" type="text" name="genre" className="form-control" />
                                    {errors.genre && touched.genre ? (<p>{errors.genre}</p>) : null}
                                </div>
                            </div>

                            <div className='col-4 m-2 d-flex justify-content-center'>
                                <button className='btn btn-dark btn-sm mb-3' type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>
                                    Confirmar
                                </button>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
      </div>
    );
}

export default RecommendationsForm;
