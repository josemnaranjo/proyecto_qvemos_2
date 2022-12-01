import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
const EditGameName = () => {
    const {id} = useParams();
    
    return (
        <div>
            <Navbar />
            <h1>Editar nombre de juego</h1>
            
        </div>
    );
}

export default EditGameName;
