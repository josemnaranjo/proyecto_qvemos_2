import React from 'react';
import {useUser} from '../contexts/userContext';
import { logout } from '../services/user.services';

const Navbar = () => {
    const {user,setUser} = useUser();

    const renderInfo = ()=>{
        if(user){
            return(<> ¡Hola {user.firstName}!</>)
        }
    }

    const logoutUser = async()=>{
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No hemos podido desloguear tu usuario")
    }

    return (
      <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    Q-VEMOS
                </a>
                <div className=" navbar" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Nuevo juego
                            </a>
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
                    <span className="navbar-text">
                        {renderInfo()}
                    </span>
                    <span className="navbar-text">
                        {user && <button onClick={logoutUser}>Logout</button>}
                    </span>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
