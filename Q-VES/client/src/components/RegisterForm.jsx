import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup'

const RegisterForm = (props) => {
    const{firstName,lastName,email, password, confirmPassword, onSubmitProp}=props;

    const valSchema = Yup.object().shape({

        firstName: Yup.string()
        .min(3,"Tu nombre es muy corto")
        .required("Por favor ingresa tu nombre"),

        lastName: Yup.string()
        .min(3,"Tu apellido es muy corto")
        .required("Por favor ingresa tu apellido"),

        email: Yup.string()
        .email("Correo no valido")
        .min(3,"Correo electronico  muy corto")
        .required("Por favor ingresa tu correo electrónico"),

        password: Yup.string()
        .equals([Yup.ref('confirmPassword'),null],"las contraseñas no son iguales")
        .min(8,"Tu contraseña debe ser más larga")
        .required("Por favor ingresa una contraseña"),

        confirmPassword: Yup.string()
        .equals([Yup.ref('password'),null],"las contraseñas no son iguales")
        .min(8,"Tu contraseña debe ser más larga")
        .required("Por favor ingresa una la confirmación de la contraseña")

    })
    return (
        <div>
        <h1>Formulario de registro</h1>
        <Formik
            initialValues={{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                confirmPassword:confirmPassword
            }}
            validationSchema = {valSchema}
            onSubmit={values=>onSubmitProp(values)}
            enableReinitialize
            >
            {({errors,touched,values})=>(
                <Form>
                    <div>
                        <label htmlFor='firstName'>Nombre:</label>
                        <Field id='firstName' type='text' name='firstName'/>
                        {errors.firstName && touched.firstName ? <p>{errors.firstName}</p>:null}
                    </div>

                    <div>
                        <label htmlFor='lastName'>Apellido:</label>
                        <Field id='lastName' type='text' name='lastName'/>
                        {errors.lastName && touched.lastName ? <p>{errors.lastName}</p>:null}
                    </div>

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

                    <div>
                        <label htmlFor='confirmPassword'>Confirmar contraseña:</label>
                        <Field id='confirmPassword' type='password' name='confirmPassword'/>
                        {errors.confirmPassword && touched.confirmPassword ? <p>{errors.confirmPassword}</p>:null}
                    </div>
                    
                    <button type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Crear usuario</button>
                </Form>
            )}
        </Formik>
        </div>
    );
}

export default RegisterForm;
