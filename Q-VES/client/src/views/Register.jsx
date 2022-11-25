import React, {useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import {useNavigate} from 'react-router-dom';
import { createUser } from '../services/user.services';

const Register = () => {
    const [errors,setErrors]= useState([]);
    const navigate = useNavigate();

    const newUser = async(values)=>{
        console.log("REGISTER VIEW - LINEA 10 ", values);
        const response = await createUser(values);

        if(response.data.message===""){
            console.log("REGISTER VIEW - LINEA 14 ",response.data);
            navigate("/")
        }else{
            const errorResponse = response.data.errors;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        }
    }
    return (
        <div>
            {errors?.map((err,i)=>(<div key={i}>{err}</div>))}
            <RegisterForm firstName="" lastName="" email="" password="" confirmPassword="" onSubmitProp={newUser} />
        </div>
    );
}

export default Register;
