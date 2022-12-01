import React,{useState, useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getWinner } from '../services/recommendations.services';


const Winner = () => {

    const [winnerTitle,setWinnerTitle]=useState();
    const [winnerId,setWinnerId] = useState();
    const {id} =useParams()
    const navigate = useNavigate();


    const getWinnerFromService = async () =>{
        const winner = await getWinner(id);
        const winnerTitle = winner.data.title ;
        const winnerId = winner.data._id;
        setWinnerTitle(winnerTitle);
        setWinnerId(winnerId);
    };


    const toEvaluation = () =>{
        navigate(`/evaluation/${id}`)
    }

    useEffect(() => {
        getWinnerFromService();
    }, []);

    return (
        <div>
            <Navbar />
            <h1 className='m-3'>¡El ganador es!</h1>
            {winnerTitle ? 
            <div className='container border rounded'>
                    <h1>{winnerTitle}</h1>
                    <button className='btn btn-outline-dark m-3' onClick={toEvaluation}>Evaluación</button>
            </div> : null}
            
        </div>
    );
}

export default Winner;
