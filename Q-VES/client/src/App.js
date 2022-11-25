import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import InicioDeJuego from './views/InicioDeJuego';
import Votaciones from './views/Votaciones';
import ResultadoFinal from './views/ResultadoFinal.jsx';
import Comentarios from './views/Comentarios';
import Register from './views/Register';
import Login from './views/Login';
import {UserProvider} from './contexts/userContext';




function App() {

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/inicio-del-juego" element={<InicioDeJuego />} />
          <Route path="/votaciones" element={<Votaciones />} />
          <Route path="/final-del-juego" element={<ResultadoFinal />} />
          <Route path="/comentarios" element={<Comentarios />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
