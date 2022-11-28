import axios from 'axios';
axios.defaults.withCredentials = true;

export const createRecommendations = async (recommendations,id) => await axios.post(`http://localhost:8000/api/new-recommendation/${id}`,recommendations);

export const createFinalistsCollection = async () => await axios.get(`http://localhost:8000/api/new-finalists-collection`);

export const getThreeFinalists = async(id) => 
    await axios.get(`http://localhost:8000/api/finals/${id}`);

export const getFinalists = async(id) => 
    await axios.get(`http://localhost:8000/api/finalists-collection/${id}`);
