import React,{useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { getWinner } from '../services/recommendations.services';

const ResultadoFinal = () => {

    const [winnerTitle,setWinnerTitle]=useState();

    const getWinnerFromService = async () =>{
        const winnerArray = await getWinner();
        const winner = winnerArray.data[0].Movies.title
        setWinnerTitle(winner)
    };

    useEffect(() => {
        getWinnerFromService();
    }, []);
    return (
        <div>
            <Navbar />
            <h1>Resultado final</h1>
            {winnerTitle? <p>{winnerTitle}</p>: null}
        </div>
    );
}

export default ResultadoFinal;
