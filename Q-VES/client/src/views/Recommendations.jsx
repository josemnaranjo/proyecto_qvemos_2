import React from 'react';
import RecommendationsForm from '../components/RecommendationsForm';
import Navbar from '../components/Navbar';
import { addRecommendationsToGame } from '../services/recommendations.services';
import { useParams } from 'react-router-dom';

const Recommendations = () => {
    const {id} = useParams();
    
    return (
        <div>
            <Navbar/>
            
        </div>
    );
}

export default Recommendations;
