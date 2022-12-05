import React, { useState } from 'react';
import RecommendationsForm from '../components/RecommendationsForm';
import Navbar from '../components/Navbar';
import { addRecommendationsToGame } from '../services/recommendations.services';
import { useParams, useNavigate } from 'react-router-dom';
import {useUser} from '../contexts/userContext';
import Swal from 'sweetalert2';


const Recommendations = () => {
    const {id} = useParams();
    const {user} = useUser();
    const navigate = useNavigate();
    const [nextPhase,setNextPhase] = useState(0);

    const addRecommendationFromService = async (values) =>{
        try{
            await addRecommendationsToGame(id,values);
            Swal.fire({
                text:"Tu recomendacion ha sido enviada con éxito",
                icon:"success",
                button:"aceptar"
            })
            setNextPhase(nextPhase+1);
        }catch(err){
            console.log(err);
            Swal.fire({
                text:"Ha ocurrido un error al enviar tu recomendacion",
                icon:"error"
            })
        }
    };

    const toThreeFinalists = () => {
        navigate(`/finalists/${id}`);
    };


    return (
        <div>
            <Navbar/>
            <div className='container card w-50 mt-5 shadow-lg p-3 mb-5 rounded'>
                <h1 className=' display-5 mt-4'>ingresa tus recomendaciones</h1>
                <div className='card-body'>
                    <RecommendationsForm userId={user._id} onSubmitProp={addRecommendationFromService} />
                    <RecommendationsForm userId={user._id} onSubmitProp={addRecommendationFromService} />
                    <button className='btn btn-outline-dark m-3' disabled={nextPhase === 2 ? false : true} onClick={toThreeFinalists}>Siguiente fase</button>
                </div>
            </div>
        </div>
    );
}

export default Recommendations; 
