import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getWinner,addScore } from '../services/recommendations.services';
import EvaluationForm from '../components/EvaluationForm';

const Evaluation = () => {

    const [winnerTitle,setWinnerTitle]=useState();
    const {id} = useParams();

    const getWinnerFromService = async () =>{
        const winnerArray = await getWinner();
        const winner = winnerArray.data[0].Movies.title;
        setWinnerTitle(winner);
    };

    useEffect(() => {
        getWinnerFromService();
    }, []);

    const addScoreFromService = async (id,values) => {
        await addScore(id,values);
    }
    

    return (
        <div>
            <Navbar/>
            <h1>¿Qué te pareció la película?</h1>

            <div>
                {winnerTitle ? <h3>{winnerTitle}</h3>: null}
                <EvaluationForm id={id} onSubmitProp ={addScoreFromService}/>
            </div>

            
        </div>
    );
}

export default Evaluation;
