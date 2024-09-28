import { Link } from 'react-router-dom';
import './home.css'

function Home() {

  return (
    <div>
      <Link to={'/log-workout'}>Registrar treino</Link>
      <Link to={'/previous-records'}>Registros anteriores</Link>
    </div>
  );
}

export default Home;
