import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import RecommendationsForm from '../components/RecommendationsForm';
import {useParams, useNavigate} from 'react-router-dom';
import {createRecommendations} from '../services/recommendations.services';


const InicioDeJuego = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [control, setControl] = useState(0);


    const newRecommendations = async (values) =>{
        const newRecommendation = await createRecommendations(values,id);
        console.log("INICIO DE JUEGO VIEW - LINEA 14 ",newRecommendation.data);
        setControl(control+1);
    }

    const toVoting = () => {
        navigate('/votaciones');
    }
    
    return (
        <div>
            <Navbar />
            <h1 className='m-4'>Inicio de juego</h1>
            <div className='container'>
                <div className='row m-4'>
                    <div className='col'>
                        <RecommendationsForm title="" genre="" onSubmitProp={newRecommendations}/>
                    </div>
                </div>
                <div className='row m-4'>
                    <div className='col'>
                        <RecommendationsForm title="" genre="" onSubmitProp={newRecommendations}/>
                    </div>
                </div>
            </div>
            <button className='btn btn-info btn-sm mb-3' disabled={control<2} onClick={toVoting}>Siguiente etapa</button>
        </div>
    );
}

export default InicioDeJuego;
