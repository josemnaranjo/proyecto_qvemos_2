import React from 'react';
import Navbar from '../components/Navbar';
import NewGameForm from '../components/NewGameForm';
import { newGame } from '../services/recommendations.services';

const NewGame = () => {

    const createNewGameFromService = async (values) =>{
        const game = await newGame(values);
        console.log(game);
    }

    return (
        <div>
            <Navbar/>
            <NewGameForm onSubmitProp={createNewGameFromService} />
        </div>
    );
}

export default NewGame;
