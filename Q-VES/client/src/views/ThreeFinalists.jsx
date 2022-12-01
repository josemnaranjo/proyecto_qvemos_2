import React,{useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getThreeFinalists, addVote } from '../services/recommendations.services';
import Navbar from '../components/Navbar';

const ThreeFinalists = () => {
    const {id} = useParams();
    const [finalists,setFinalists] = useState([]);
    const [nextPhase,setNextPahse] = useState(false);
    const navigate = useNavigate();

    const getFinalistsFromService = async () =>{
        const result = await getThreeFinalists(id);
        console.log(result.data);
        setFinalists(result.data);
    };

    useEffect(() => {
        getFinalistsFromService();
    }, []);

    const addVoteFromService = async(idRec) =>{
        // console.log(idRec)
        await addVote(id,{idRec:idRec});
        setNextPahse(true);
    };

    const toWinnerPage = () =>{
        navigate('/winner');
    }

    return (
        <div>
            <Navbar />
            <h1>Los finalistas son</h1>
            <div className='container p-2 border rounded'>
            {finalists?.map((movie,i)=>(
                <div className='d-flex m-2 p-2 justify-content-center align-items-center border rounded' key={i}>
                    <p className='pt-3'>{movie.title}</p>
                    <button className='btn btn-outline-dark btn-sm' onClick={()=>addVoteFromService(movie._id)}>Votar</button>
                </div>
            ))}
            {nextPhase ? <button className='btn btn-success' onClick={toWinnerPage}>Ver ganador</button>: null}
            </div>

            
        </div>
    );
}

export default ThreeFinalists;
