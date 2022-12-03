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
            <h1 className='m-4'>Top 3 mejores recomendaciones</h1>
            <div className='container'>
                <table className='table table-striped table-hover table-bordered table-dark table-sm'>
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

                <h1 className='m-4'>Sala de juegos activas</h1>
                <table className='table table-striped table-hover table-bordered table-dark table-sm'>
                    <thead>
                        <tr>
                            <th scope="col">Salas</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games?.map((game,i)=>(
                            <tr key={i}>
                                <td>{game.name}</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-primary' onClick={()=>toGame(game._id)}>unirse al juego
                                    </button>
                                    <button className='btn btn-danger' onClick={()=>removeGame(game._id)}>finalizar juego
                                    </button>
                                    <button className='btn btn-secondary' onClick={()=>toEditName(game._id)}>editar nombre
                                    </button>
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
