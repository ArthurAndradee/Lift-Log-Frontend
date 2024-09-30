import { Link } from 'react-router-dom';
import './welcome.css'

function Welcome() {

  return (
    <div>
      <Link to={'/workout-container'}>Registrar treino</Link>
      <Link to={'/previous-records'}>Ver treinos anteriores</Link>
    </div>
  );
}

export default Welcome;
