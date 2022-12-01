import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewGameForm from '../components/NewGameForm';
import { newGame } from '../services/recommendations.services';

const NewGame = () => {
    const [idGame,setIdGame] = useState();
    const [nextPhase,setNextPhase] = useState(true);
    const navigate = useNavigate()

    const createNewGameFromService = async (values) =>{
        const game = await newGame(values);
        const gameId = game.data.id;
        setIdGame(gameId);
        setNextPhase(false);
    };

    const goToRecommendations = () => {
        navigate(`/recommendations/${idGame}`);
    } 

    return (
        <div>
            <Navbar/>
            <div className='container'>
                <h1>Crea una nuevo juego</h1>
                <NewGameForm onSubmitProp={createNewGameFromService} />
                <button className='btn btn-outline-info m-3' disabled={nextPhase} onClick={goToRecommendations}>Siguiente fase</button>
            </div>
        </div>
    );
}

export default NewGame;
