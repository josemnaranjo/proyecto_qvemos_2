import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getWinner } from '../services/recommendations.services';


const Winner = () => {

    const [winnerTitle,setWinnerTitle]=useState();
    const [winnerId,setWinnerId] = useState();
    const navigate = useNavigate();


    const getWinnerFromService = async () =>{
        const winnerArray = await getWinner();
        const winner = winnerArray.data[0].movies.title;
        const winnerId = winnerArray.data[0].movies._id;
        setWinnerTitle(winner);
        setWinnerId(winnerId);
    };


    const toEvaluation = () =>{
        navigate(`/evaluation/${winnerId}`)
    }

    useEffect(() => {
        getWinnerFromService();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>¡El ganador es!</h1>
            {winnerTitle ? <div>
                <p>{winnerTitle}</p>
                <button className='btn' onClick={toEvaluation}>Evaluación</button>
                </div> : null}
            
        </div>
    );
}

export default Winner;
