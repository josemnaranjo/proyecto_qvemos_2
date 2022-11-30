import axios from 'axios';
axios.defaults.withCredentials = true;

export const createRecommendations = async (recommendations,id) => await axios.post(`http://localhost:8000/api/new-recommendation/${id}`,recommendations);

export const createFinalistsCollection = async () => await axios.get(`http://localhost:8000/api/new-finalists-collection`);

export const getThreeFinalists = async(id) => 
    await axios.get(`http://localhost:8000/api/finals/${id}`);

export const getFinalists = async(id) => 
    await axios.get(`http://localhost:8000/api/finalists-collection/${id}`);


export const addVote = async(id,idTF) => await axios.post(`http://localhost:8000/api/add-vote/${id}`,idTF);

export const getWinner = async () => await axios.get('http://localhost:8000/api/get-winner');

export const addScore = async (id,score) => await axios.post(`http://localhost:8000/api/score-winner/${id}`,score);

export const deleteThreeCollection = async() => await axios.delete('http://localhost:8000/api/delete-collection');

export const getThreeBestMovies = async () => await axios.get('http://localhost:8000/api/best-scored-movies');