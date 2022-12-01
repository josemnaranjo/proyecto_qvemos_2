import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';

const EvaluationForm = (props) => {
    const { id, onSubmitProp} = props;

    const valSchema = Yup.object().shape({

        score: Yup.number()
        .required("Por favor ingresa tu evaluaicion"),
    }); 

    return (
        <div>
            <Formik
            initialValues={{
                score: 0
            }}
            validationSchema = {valSchema}
            onSubmit={values=>onSubmitProp(id,values)}
            >
            {({errors,touched})=>(
                <Form>
                    <div className= 'container d-flex justify-content-center align-items-center p-4 border rounded'>

                        <div className='col'>
                            <label htmlFor='score'>Evaluacion (1 a 5):</label>
                            <Field id='score' as='select' name='score'>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Field>
                            {errors.score && touched.score ? <p>{errors.score}</p>:null}
                        </div>
                    </div>
                    <button className='btn btn-outline-dark mt-3' type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Enviar evaluacion</button>
                </Form>
            )}
        </Formik>
            
        </div>
    );
}

export default EvaluationForm;
