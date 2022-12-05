import React,{useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getThreeFinalists, addVote } from '../services/recommendations.services';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

const ThreeFinalists = () => {
    const {id} = useParams();
    const [finalists,setFinalists] = useState([]);
    const [nextPhase,setNextPahse] = useState(false);
    const navigate = useNavigate();
    const [btnActive,setBtnActive] = useState(false);

    const getFinalistsFromService = async () =>{
        const result = await getThreeFinalists(id);
        setFinalists(result.data);
    };

    useEffect(() => {
        getFinalistsFromService();
    }, []);

    const addVoteFromService = async(idRec) =>{
        try{
            await addVote(id,{idRec:idRec});
            setNextPahse(true);
            Swal.fire({
                text:"¡Gracias por votar!",
                icon:"success"
            })
            setBtnActive(true);
        }catch(err){
            console.log(err);
        }
    };

    const toWinnerPage = () =>{
        navigate(`/winner/${id}`);
    }

    return (
        <div>
            <Navbar />
            <div className='container card w-75 text-white bg-dark mt-5 shadow-lg p-3 mb-5 rounded'>
                <div className='card-body'>
                    <h1 className='display-5'>finalistas</h1>
                    <ul className='list-group list-group-flush mt-4'>
                        {finalists?.map((movie,i)=>(
                            <li className='list-group-item d-flex justify-content-between align-items-center' key={i}>
                                <p className='pt-3'>{movie.title}</p>
                                <button className='btn btn-outline-dark btn-sm' disabled={btnActive} onClick={()=>addVoteFromService(movie._id)}>Votar</button>
                            </li>
                        ))}
                    </ul>
                    {nextPhase ? <button className='btn btn-outline-light m-3' onClick={toWinnerPage}>Ver ganador</button>: null}
                </div>
            </div>
        </div>
    );
}

export default ThreeFinalists;
