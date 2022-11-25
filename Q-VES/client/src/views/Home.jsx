import React from 'react';
import { logout } from '../services/user.services';

const Home = () => {
    const logoutUser = async()=>{
        const {success} = await logout();
        console.log(success);
    }
    return (
        <div>
            <h1>Este es el home</h1>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
}

export default Home;
