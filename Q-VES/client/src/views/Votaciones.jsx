import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getFinalists } from '../services/recommendations.services';

const Votaciones = () => {
    const {id} = useParams();
    const [finalists,setFinalist] = useState([])

    const getFinalistsFromService = async() =>{
        console.log(id);
        const result = await getFinalists(id);
        const movies = result.data.movies
        console.log("VOTACIONES VIEW - LINEA 12 ", movies);
        setFinalist(movies);
    };

    useEffect(() => {
        getFinalistsFromService();
    }, []);

    return (
        <div>
            <Navbar/>
            <h1>Votaciones</h1>
            {finalists?.map((movie,i)=>(<p key={i}>{movie.title} {movie.genre}</p>))}
        </div>
    );
}

export default Votaciones;
