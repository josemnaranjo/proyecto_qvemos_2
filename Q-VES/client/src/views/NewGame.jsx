import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewGameForm from '../components/NewGameForm';
import { newGame } from '../services/recommendations.services';

const NewGame = () => {
    const [idGame,setIdGame] = useState();
    const navigate = useNavigate()

    const createNewGameFromService = async (values) =>{
        const game = await newGame(values);
        const gameId = game.data.id;
        setIdGame(gameId);
    };

    const goToRecommendations = () => {
        navigate(`/recommendations/${idGame}`);
    } 

    return (
        <div>
            <Navbar/>
            <NewGameForm onSubmitProp={createNewGameFromService} />
            <button onClick={goToRecommendations}>Siguiente fase</button>
        </div>
    );
}

export default NewGame;
