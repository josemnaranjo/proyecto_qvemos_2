import React from 'react';
import RecommendationsForm from '../components/RecommendationsForm';
import Navbar from '../components/Navbar';
import { addRecommendationsToGame } from '../services/recommendations.services';
import { useParams, useNavigate } from 'react-router-dom';
import {useUser} from '../contexts/userContext';

const Recommendations = () => {
    const {id} = useParams();
    const {user} = useUser();
    const navigate = useNavigate();

    const addRecommendationFromService = async (values) =>{
        await addRecommendationsToGame(id,values)
    };

    const toThreeFinalists = () => {
        navigate(`/finalists/${id}`);
    }


    return (
        <div>
            <Navbar/>
            <div className='container border rounded'>
                <h1 className='m-3'>ingresa tus recomendaciones</h1>
                <RecommendationsForm userId={user._id} onSubmitProp={addRecommendationFromService} />
                <RecommendationsForm userId={user._id} onSubmitProp={addRecommendationFromService} />
                <button className='btn btn-outline-dark m-3' onClick={toThreeFinalists}>Siguiente fase</button>
            </div>
        </div>
    );
}

export default Recommendations;
