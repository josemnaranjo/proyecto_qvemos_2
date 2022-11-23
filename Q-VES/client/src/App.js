import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import InicioDeJuego from './views/InicioDeJuego';
import Votaciones from './views/Votaciones';
import ResultadoFinal from './views/ResultadoFinal.jsx';
import Comentarios from './views/Comentarios';



function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/inicio-del-juego' element={<InicioDeJuego/>}/>
            <Route path='/votaciones' element={<Votaciones/>}/>
            <Route path='/final-del-juego' element={<ResultadoFinal/>}/>
            <Route path='/comentarios' element={<Comentarios/>}/>
        </Routes>
    </div>
  );
}

export default App;
