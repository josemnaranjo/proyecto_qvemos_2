import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';


const EditGameNameForm = (props) => {
    const {name,id,onSubmitProp} = props;


    const valSchema = Yup.object().shape({

        name: Yup.string()
        .min(3,"Titulo muy corto")
        .required("Por favor ingresa un nombre para la sala"),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    name: name, 
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(id,values)}
                enableReinitialize
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className='row d-flex align-items-center justify-content-center p-3 border rounded'>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor="name" className='mb-2'>Nombre de la sala:</label>
                                    <Field id="name" type="text" name="name" className="form-control" />
                                    {errors.name && touched.name ? <p>{errors.name}</p> : null}
                                </div>
                            </div>

                            <div className='col-4 m-2 d-flex justify-content-center'>
                                <button className=' btn btn-dark btn-sm' type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>
                                    Editar nombre
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
           
            
        </div>
    );
}

export default EditGameNameForm;
