import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewGameForm from '../components/NewGameForm';
import { newGame } from '../services/recommendations.services';
import Swal from 'sweetalert2';

const NewGame = () => {
    const [idGame,setIdGame] = useState();
    const [nextPhase,setNextPhase] = useState(true);
    const navigate = useNavigate();

    const createNewGameFromService = async (values) =>{
        const game = await newGame(values);
        const gameId = game.data.id;
        setIdGame(gameId);
        Swal.fire({
            text:"nueva sala creada con éxito",
            icon:"success"
        })
        setNextPhase(false);
    };


    const goToRecommendations = () => {
        navigate(`/recommendations/${idGame}`);
    } 

    return (
        <div>
            <Navbar/>
            <div className='container card w-50 mt-5 shadow-lg p-4 mb-5 rounded'>
                <div className='card-body'>
                    <h1 className='display-5'>nuevo juego</h1>
                    <NewGameForm onSubmitProp={createNewGameFromService} />
                    <button className='btn btn-outline-dark m-3' disabled={nextPhase} onClick={goToRecommendations}>siguiente</button>
                </div>
            </div>
        </div>
    );
}

export default NewGame;
