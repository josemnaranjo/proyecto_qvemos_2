import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import { getFourFinalists } from '../services/recommendations.services';

const Votaciones = () => {
    return (
        <div>
            <Navbar/>
            <h1>Votaciones</h1>
        </div>
    );
}

export default Votaciones;
