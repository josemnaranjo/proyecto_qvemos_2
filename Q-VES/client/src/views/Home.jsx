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
            <h1 className='m-4'>Top 3 mejores recomendaciones</h1>
            <div className='container'>
                <table className='table table-striped table-hover table-bordered table-sm'>
                    <thead>
                        <tr>
                            <th scope="col">Titulo</th>
                            <th scope="col">Puntuacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestMovies?.map((movie,i)=>(
                            <tr key={i}>
                                <td>{movie.title}</td>
                                <td>{movie.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
