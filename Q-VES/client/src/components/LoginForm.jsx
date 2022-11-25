import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup'

const LoginForm = (props) => {
    const{email, password, onSubmitProp}=props;

      const valSchema = Yup.object().shape({

        email: Yup.string()
        .email("Correo no valido")
        .min(3,"Correo electronico  muy corto")
        .required("Por favor ingresa tu correo electrónico"),

        password: Yup.string()
        .min(8,"Tu contraseña debe ser más larga")
        .required("Por favor ingresa una contraseña"),


    })
    return (
    <div>
        <h1>Iniciar sesion</h1>
        <Formik
            initialValues={{
                email:email,
                password:password,
            }}
            validationSchema = {valSchema}
            onSubmit={values=>onSubmitProp(values)}
            enableReinitialize
            >
            {({errors,touched,values})=>(
                <Form>

                    <div>
                        <label htmlFor='email'>Correo electrónico:</label>
                        <Field id='email' type='text' name='email'/>
                        {errors.email && touched.email ? <p>{errors.email}</p>:null}
                    </div>

                    <div>
                        <label htmlFor='password'>Contraseña:</label>
                        <Field id='password' type='password' name='password'/>
                        {errors.password && touched.password ? <p>{errors.password}</p>:null}
                    </div>

                    <button type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Log in</button>
                </Form>
            )}
        </Formik>
        </div>
    );
}

export default LoginForm;
