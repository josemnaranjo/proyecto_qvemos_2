import React from 'react';
import Navbar from '../components/Navbar';
import RecommendationsForm from '../components/RecommendationsForm';
import {useParams, useNavigate} from 'react-router-dom';
import {createRecommendations} from '../services/recommendations.services';


const InicioDeJuego = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const newRecommendations = async (values) =>{
        const newRecommendation = await createRecommendations(values,id);
        console.log("INICIO DE JUEGO VIEW - LINEA 14 ",newRecommendation.data);
        navigate('/votaciones');
    }
    
    return (
        <div>
            <Navbar />
            <h1>Inicio de juego</h1>
            <RecommendationsForm title="" genre="" onSubmitProp={newRecommendations}/>
        </div>
    );
}

export default InicioDeJuego;
