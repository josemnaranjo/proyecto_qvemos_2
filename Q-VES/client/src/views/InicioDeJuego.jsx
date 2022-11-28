import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import RecommendationsForm from '../components/RecommendationsForm';
import {useParams, useNavigate} from 'react-router-dom';
import {createRecommendations,createFinalistsCollection,getThreeFinalists} from '../services/recommendations.services';


const InicioDeJuego = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [control, setControl] = useState(0);
    const [finalistsId, setFinalistsId] = useState();


    const newRecommendations = async (values) =>{
        const newRecommendation = await createRecommendations(values,id);
        console.log("INICIO DE JUEGO VIEW - LINEA 14 ",newRecommendation.data);
        setControl(control+1);
    };

    const createNewCollection = async() =>{
        const result = await createFinalistsCollection();
        const collectionId = result.data.id;
        setFinalistsId(collectionId);

        const result2 = await getThreeFinalists(collectionId);
        console.log(result2.data);
    }

    const toVoting = () => {
        navigate(`/votaciones/${finalistsId}`);
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
            {/* <div>
                <button className='btn btn-info btn-sm mb-3' disabled={control<2} onClick={toVoting}>Siguiente etapa</button>
            </div> */}

            <div className='btn-group'>
                <button className='btn btn-outline-primary btn-sm mb-3'onClick={createNewCollection}>Crear coleccion de finalistas</button>
                {finalistsId ? <button className='btn btn-outline-primary btn-sm mb-3'onClick={toVoting}>Siguiente etapa</button> :null}
            </div>
        </div>
    );
}

export default InicioDeJuego;
