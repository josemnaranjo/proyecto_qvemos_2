import axios from 'axios';
axios.defaults.withCredentials = true;

export const createRecommendations = async (recommendations,id) => await axios.post(`http://localhost:8000/api/new-recommendation/${id}`,recommendations);

export const getFourFinalists = async () => await axios.get(`http://localhost:8000/api/getFourFinalists`)