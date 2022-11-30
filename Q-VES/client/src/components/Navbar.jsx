import React from 'react';
import {useUser} from '../contexts/userContext';
import { logout } from '../services/user.services';
import {useNavigate} from 'react-router-dom';
import { deleteThreeCollection } from '../services/recommendations.services';

const Navbar = () => {
    const {user,setUser} = useUser();
    const navigate = useNavigate();

    const renderInfo = ()=>{
        if(user){
            return(<> ¡Bienvenido {user.firstName}!</>)
        }else{
            return(<>Por favor, inicia sesión</>)
        }
    };

    const logoutUser = async()=>{
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No hemos podido desloguear tu usuario")
    };

    const toNewGame = async()=>{
        console.log(user);
        await deleteThreeCollection();
        navigate(`/inicio-del-juego/${user._id}`)
    };

    return (
      <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    Q-VEMOS
                </a>
                <div className="navbar" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            {user && 
                            <button className='btn btn-outline-light btn-sm' onClick={toNewGame}>
                                Nuego juego
                            </button>}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">
                                Register
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                    </ul>
                    </div>
                    <div className='collapse navbar-collapse justify-content-end'>
                        <ul className='navbar-nav d-flex'>
                            <li className='navbar-text'>
                                {renderInfo()}
                            </li>
                                {user && <button className='btn btn-outline-light btn-sm' onClick={logoutUser}>Logout</button>}
                        </ul>
                    </div>
            </nav>
        </div>
    );
}

export default Navbar;
