import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { getThreeBestMovies } from '../services/recommendations.services';


const Home = () => {
    const [bestMovies,setBestMovies] = useState([]);

    const getThreeBestMoviesFromService = async () => {
        const result = await getThreeBestMovies();
        const bestMoviesArray = result.data;
        const bestThreeMovies = bestMoviesArray.slice(0,3);
        setBestMovies(bestThreeMovies);
    }

    useEffect(() => {
        getThreeBestMoviesFromService();
    }, []);
    
    return (
        <div>
            <Navbar/>
            <h1>Este es el home</h1>
            {bestMovies?.map((movie,i)=>(
                <p key={i}>{movie.title} {movie.score}</p>
            ))}
        </div>
    );
}

export default Home;
