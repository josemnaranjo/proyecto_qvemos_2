import React from 'react';
import RecommendationsForm from '../components/RecommendationsForm';
import Navbar from '../components/Navbar';
import { addRecommendationsToGame } from '../services/recommendations.services';
import { useParams } from 'react-router-dom';
import {useUser} from '../contexts/userContext';

const Recommendations = () => {
    const {id} = useParams();
    const {user} = useUser();

    const addRecommendationFromService = async (values) =>{
        await addRecommendationsToGame(id,values)
    }


    return (
        <div>
            <Navbar/>
            <h1>Ingresa tu recomendacion</h1>
            <RecommendationsForm userId={user._id} onSubmitProp={addRecommendationFromService} />
            <RecommendationsForm userId={user._id} onSubmitProp={addRecommendationFromService} />
        </div>
    );
}

export default Recommendations;
