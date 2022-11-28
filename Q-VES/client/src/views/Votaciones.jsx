import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getFinalists, addVote } from '../services/recommendations.services';

const Votaciones = () => {
    const {id} = useParams();
    const [finalists,setFinalist] = useState([])

    const getFinalistsFromService = async() =>{
        // console.log(id);
        const result = await getFinalists(id);
        const movies = result.data.movies
        // console.log("VOTACIONES VIEW - LINEA 12 ", movies);
        setFinalist(movies);
    };

    const addVoteFromService = async(idMovie) =>{
        await addVote(idMovie);
    }

    useEffect(() => {
        getFinalistsFromService();
    }, []);

    return (
        <div>
            <Navbar/>
            <h1>¡Vota!</h1>
            <div className='container p-2 border rounded'>
            {finalists?.map((movie,i)=>(
                <div className='d-flex m-2 p-2 justify-content-center align-items-center border rounded' key={i}>
                    <p className='pt-3'>{movie.title}</p>
                    <button className='btn btn-outline-dark btn-sm' onClick={()=>addVoteFromService(movie._id)}>Votar</button>
                </div>
            ))}
            </div>
            
        </div>
    );
}

export default Votaciones;
