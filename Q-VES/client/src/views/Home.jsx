import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getThreeBestMovies, getAllGames, deleteGame } from '../services/recommendations.services';


const Home = () => {
    const [bestMovies,setBestMovies] = useState([]);
    const [games,setGames] = useState([]);
    const navigate = useNavigate()

    const getThreeBestMoviesFromService = async () => {
        const result = await getThreeBestMovies();
        const bestMoviesArray = result.data;
        const bestThreeMovies = bestMoviesArray.slice(0,3);
        setBestMovies(bestThreeMovies);
    };

    const getAllGamesFromService = async () => {
        const result = await getAllGames();
        setGames(result.data)
    };

    const toGame = (id) =>{
        navigate(`/recommendations/${id}`)
    }

    const removeGame = async (id) =>{
        try{
            await deleteGame(id);
            setGames(games.filter(game => game._id !== id));
        }catch(err){
            console.log(err)
        }
    };

    const toEditName = (id) => {
        navigate(`/edit-game-name/${id}`)
    }


    useEffect(() => {
        getThreeBestMoviesFromService();
        getAllGamesFromService();
    }, []);
    
    return (
        <div>
            <Navbar/>
            <div className='container'>
            <h1 className='display-5 m-4'>Top 3 mejores recomendaciones</h1>
                <table className='table table-striped table-hover table-bordered table-sm'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col" className='lead'>Titulo</th>
                            <th scope="col" className='lead'>Puntuacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestMovies?.map((movie,i)=>(
                            <tr key={i}>
                                <td className='m-3'>{movie.title}</td>
                                <td className='m-3'>{movie.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h1 className='display-5 m-4'>Sala de juegos activas</h1>
                <table className='table table-striped table-hover table-bordered table-sm'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col" className='lead'>Salas</th>
                            <th scope="col" className='lead'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games?.map((game,i)=>(
                            <tr key={i}>
                                <td>{game.name}</td>
                                <td className='d-flex justify-content-center'>
                                    <div className='btn-group' role="group">
                                        <button className='btn btn-outline-success' onClick={()=>toGame(game._id)}>unirse
                                        </button>
                                        <button className='btn btn-outline-dark' onClick={()=>toEditName(game._id)}>editar nombre
                                        </button>
                                        <button className='btn btn-outline-danger' onClick={()=>removeGame(game._id)}>finalizar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}

export default Home;
