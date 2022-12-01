import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import InicioDeJuego from './views/InicioDeJuego';
import Votaciones from './views/Votaciones';
import ResultadoFinal from './views/ResultadoFinal.jsx';
import Comentarios from './views/Comentarios';
import Register from './views/Register';
import Login from './views/Login';
import Evaluation from './views/Evaluation';
import NewGame from './views/NewGame';
import Recommendations from './views/Recommendations.jsx';
import ThreeFinalists from './views/ThreeFinalists';
import Winner from './views/Winner';
import {UserProvider} from './contexts/userContext';




function App() {

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/inicio-del-juego/:id" element={<InicioDeJuego />} />
          <Route path="/votaciones/:id" element={<Votaciones />} />
          <Route path="/final-del-juego" element={<ResultadoFinal />} />
          <Route path="/comentarios" element={<Comentarios />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ganador" element={<ResultadoFinal />} />
          <Route path="/evaluation/:id" element={<Evaluation />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/recommendations/:id" element={<Recommendations />} />
          <Route path="/finalists/:id" element={<ThreeFinalists />} />
          <Route path="/winner/" element={<Winner />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
