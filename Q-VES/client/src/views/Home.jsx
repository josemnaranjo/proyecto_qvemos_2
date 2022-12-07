import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getThreeBestMovies, getAllGames, deleteGame , deleteFinalistsCollection } from '../services/recommendations.services';
import { motion } from 'framer-motion';


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
            await deleteFinalistsCollection();
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
            <div className='container-fluid w-75 d-flex'>

                <motion.div whileHover={{scale:1.1}}  className=' container card text-white bg-dark mt-5 shadow-lg p-3 mb-5 rounded'>
                    <div className='card-body'>
                        <h1 className='card-title mt-4'>mejores recomendaciones</h1>
                        <ul className='list-group list-group-flush mt-4'>
                            {bestMovies?.map((movie,i)=> (
                                <li className='list-group-item d-flex justify-content-between align-items-center'> {movie.title}
                                <span 
                                class="badge bg-dark rounded-pill">
                                    {movie.score}
                                </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div whileHover={{scale:1.1}}  className='container card mt-5 shadow-lg p-3 mb-5 rounded'>
                    <div className='card-body'>
                        <h1 className='card-title mt-4'>salas activas</h1>
                        <ul className='list-group list-group-flush mt-4'>
                            {games?.map((game,i)=>(
                                <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
                                    {game.name}
                                    <div className='dropdown'>
                                        <button className='btn btn-dark dropdown-toggle'type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">acciones</button>
                                        <ul className='dropdown-menu'aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <button className='dropdown-item' type='button'onClick={()=>toGame(game._id)}>unirse</button>
                                            </li>
                                            <li>
                                                <button className='dropdown-item' type='button'onClick={()=>toEditName(game._id)}>editar nombre</button>
                                            </li>
                                            <li>
                                                <button className='dropdown-item' type='button'onClick={()=>removeGame(game._id)}>finalizar</button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

export default Home;
